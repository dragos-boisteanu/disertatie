<?php

namespace App\Services;

use Exception;
use App\Models\Order;
use App\Models\Product;
use App\Events\OrderCreated;
use App\Jobs\SendOrderEmailJob;
use App\Events\OrderStatusUpdate;
use App\Events\UpdateTableStatus;
use Illuminate\Support\Facades\DB;
use App\Jobs\Orders\OrderCanceledJob;
use App\Exceptions\NotInStockException;
use App\Interfaces\OrderServiceInterface;
use App\Interfaces\TableServiceInterface;
use App\Jobs\Orders\OrderStatusUpdatedJob;
use Illuminate\Pagination\LengthAwarePaginator;
use App\Interfaces\ProductStockServiceInterface;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class OrderService implements OrderServiceInterface
{

	private $productStockService;
	private $tableService;

	public function __construct(ProductStockServiceInterface $productStockService, TableServiceInterface $tableService)
	{
		$this->productStockService = $productStockService;
		$this->tableService = $tableService;
	}

	public function getOrderById(int $orderId, ?int $authClientId = null): Order
	{
		try {
			$query = Order::withTrashed();

			if (isset($authClientId)) {
				$query->where('client_id', $authClientId);
			}

			$order = $query->findOrFail($orderId);

			return $order;
		} catch (ModelNotFoundException $mex) {
			throw new ModelNotFoundException('No order found with #' . $orderId . ' id');
		} catch (\Exception $ex) {
			dd($ex);
			throw new \Exception('Something went wrong');
		}
	}

	public function getOrders(int $perPage = 8, ?int $orderBy = null, ?array $data = null, ?int $authClientId = null): LengthAwarePaginator
	{

		$query = Order::withTrashed();

		if (isset($authClientId)) {
			$query->where('client_id', $authClientId);
		}

		switch ($orderBy) {
			case 1:
				$query->orderBy('created_at', 'desc');
				break;
			case 2:
				$query->orderBy('created_at', 'asc');
				break;
			default: {
					$query->orderBy('created_at', 'desc');
					break;
				}
		}

		$query->orderBy('id', 'asc');

		$orders = $query->filter($data)->paginate($perPage);

		return $orders;
	}

	public function create(array $data, int $userId = null): Order
	{
		$order = new Order();

		DB::beginTransaction();
		try {
			$order = new Order;

			$order->delivery_method_id = $data['deliveryMethodId'];

			$order->status_id = 2; // recieved
			$order->staff_id = $userId;

			if (array_key_exists('paymentMethod', $data)) {
				$order->payment_method_id = $data['paymentMethod'];
			}

			if (array_key_exists('phoneNumber', $data)) {
				$order->phone_number = $data['phoneNumber'];
			}

			if ($data['deliveryMethodId'] == 1) {
				$order->address = $data['address'];
			}

			if ($data['deliveryMethodId'] == 2) {
				$order->address = 'local';
			}

			if (array_key_exists('tableId', $data) && $data['deliveryMethodId'] == 3) {
				$order->table_id = $data['tableId'];
				$this->tableService->setStatus($data['tableId'], 2);

				$tableStatus = $this->tableService->getStatusById(2);
				broadcast(new UpdateTableStatus($tableStatus, $data['tableId']));
			}

			if (array_key_exists('name', $data)) {
				$order->name = $data['name'];
			}

			if (array_key_exists('observations', $data)) {
				$order->observations =  $data['observations'];
			}

			if (array_key_exists('clientId', $data)) {
				$order->client_id = $data['clientId'];
			}

			if (array_key_exists('email', $data)) {
				$order->email = $data['email'];
			}

			$order->save();

			$order = $this->addItems($order, $data['items']);

			DB::commit();

			dispatch((new SendOrderEmailJob($order))->onQueue('email'));

			if (is_null($userId)) {
				broadcast(new OrderCreated($order));
			} else {
				broadcast(new OrderCreated($order))->toOthers();
			}



			return $order;
		} catch (NotInStockException $ex) {
			throw new NotInStockException($ex->getMessage());
		} catch (\Exception $e) {
			DB::rollBack();
			throw new \Exception("Error Creating Order");
			// throw new \Exception($e->getMessage());
		};
	}

	public function update(array $data, Order $order): Order
	{
		try {

			if (array_key_exists('address', $data)) {
				$order->address = $data['address'];
			}

			if (array_key_exists('observations', $data)) {
				$order->observations = $data['observations'];
			}

			$order->save();
			$order->refresh();

			return $order;
		} catch (\Exception $ex) {
			throw new \Exception('Faied to update order #', $order->id);
		}
	}

	public function updateStatus(int $statusId, Order $order): Order
	{
		try {
			$oldStatus = $order->status;

			$order->status_id = $statusId;

			if ($order->delivery_method_id == 3 && $statusId == 7) {
				$this->tableService->setStatus($order->table_id, 1);
				$tableStatus = $this->tableService->getStatusById(1);
				broadcast(new UpdateTableStatus($tableStatus, $order->table_id));
			}

			$order->save();
			$order->refresh();

			dispatch((new OrderStatusUpdatedJob($order, $oldStatus))->onQueue('email'));

			broadcast(new OrderStatusUpdate($order));

			return $order;
		} catch (\Exception $ex) {
			throw new \Exception('Faied to update order #' . $order->id . ' status');
			// throw new \Exception($ex->getMessage());
		}
	}

	public function disable(Order $order): Order
	{
		try {

			if ($order->table_id) {
				$this->tableService->setStatus($order->table_id, 1);
				$tableStatus = $this->tableService->getStatusById(1);
				broadcast(new UpdateTableStatus($tableStatus, $order->table_id));
			}

			$order = $this->removeItems($order);

			dispatch((new OrderCanceledJob($order))->onQueue('email'));

			broadcast(new OrderStatusUpdate($order));

			return $order;
		} catch (\Exception $ex) {
			throw new Exception('Failed to disable order #' . $order->id);
		}
	}

	public function linkStaffWithOrder(int $staffId, Order $order): Order
	{
		try {
			$order->staff_id = $staffId;
			$order->save();
			return $order;
		} catch (\Exception $ex) {
			throw new Exception('Failed to link waiter to order');
		}
	}


	private function addItems(Order $order, array $items): Order
	{
		foreach ($items as $item) {
			$product = Product::findOrFail($item['id']);
			$order->products()->attach($item['id'], [
				"product_name" => $product->name,
				"quantity" => $item['quantity'],
				"base_unit_price" => $product->base_price,
				"discount" => $product->finalDiscount,
				"vat" => $product->vat
			]);

			$this->productStockService->removeFromStock($product, $item['quantity']);
		}

		return $order;
	}

	private function removeItems(Order $order): Order
	{
		DB::transaction(function () use ($order) {
			foreach ($order->products as $product) {
				$this->productStockService->addBackToStock($product, $product->pivot->quantity);
			}

			$order->status_id = 8;
			$order->save();

			$order->delete();
		});

		$order->refresh();

		return $order;
	}
}
