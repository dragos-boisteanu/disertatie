<?php


namespace App\Services;

use App\Models\Order;
use Barryvdh\Debugbar\Facade as Debugbar;

use App\Models\Product;
use Carbon\Traits\Date;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\OrderProduct;
use Illuminate\Database\Eloquent\Collection;
use App\Interfaces\OrderItemServiceInterface;
use App\Interfaces\ProductStockServiceInterface;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class OrderItemService implements OrderItemServiceInterface
{

	private $productStockService;

	public function __construct(ProductStockServiceInterface $productStockService)
	{
		$this->productStockService = $productStockService;
	}

	public function getProductsByName(string $productName): Collection
	{
		$products = Product::where('name', 'like', '%' . $productName . '%')->get();

		return $products;
	}

	public function getProductsById(int $productId): Product
	{
		try {
			$product = Product::findOrFail($productId);
			return $product;
		} catch (ModelNotFoundException $mex) {
			throw new ModelNotFoundException('No order found with #' . $productId . ' id');
		} catch (\Exception $ex) {;
			throw new \Exception('Something went wrong');
		}
	}

	public function removeFromOrder(int $itemId, Order $order): Carbon
	{
		try {
			DB::transaction(function () use ($order, $itemId) {

				$product = $order->products()->where('product_id', $itemId)->first();

				$this->productStockService->addBackToStock($product);

				$order->products()->detach($itemId);

				$order->touch();

				$order->save();
			});

			$order->refresh();

			return $order->updated_at;
		} catch (\Exception $ex) {
			debug($ex);
			throw new \Exception('Something went wrong');
		}
	}

	public function addItemToOrder(array $item, Order $order): array
	{
		try {
			DB::transaction(function () use ($order, $item) {
				$product = $order->products()->where('product_id',  $item['id'])->first();
				if (isset($product)) {
					$newQuantity = $product->pivot->quantity + $item['quantity'];
					$order->products()->updateExistingPivot($item['id'], ['quantity' => $newQuantity]);
				} else {
					$product = Product::findOrFail($item['id']);
					$order->products()->attach($item['id'], [
						"product_name" => $product->name,
						"quantity" => $item['quantity'],
						"base_unit_price" => $product['base_price'],
						"discount" => $product['finalDiscount'],
						"vat" => $product['vat']
					]);
				}

				$order->touch();

				$order->save();
				$order->refresh();

				$this->productStockService->removeFromStock($product, $item['quantity']);
			});

			$product = $order->products()->where('product_id',  $item['id'])->firstOrFail();

			return [
				'item' => new OrderProduct($product),
				'totalValue' => $order->getTotalValueAttribute(),
				'totalQuantity' => $order->getTotalQuantityAttribute(),
				'updatedAt' => $order->updated_at
			];
		} catch (\Exception $ex) {
			throw new \Exception('Something went wrong');
		}
	}

	public function patchOrderItem(array $data, Order $order): array
	{
		try {
			DB::transaction(function () use ($data, $order) {
				$product = $order->products()->where('product_id', $data['itemId'])->first();

				if ($product->quantity >= $data['quantity']) {

					if ($data['quantity'] > 0) {
						$newQuantity = $product->pivot->quantity + abs($data['quantity']);
						$this->productStockService->removeFromStock($product, abs($data['quantity']));
					} else {
						$newQuantity = $product->pivot->quantity - abs($data['quantity']);
						$this->productStockService->addBackToStock($product, abs($data['quantity']));
					}
					$order->products()->updateExistingPivot($data['itemId'], ['quantity' => $newQuantity]);

					$order->touch();

					$order->save();
				}
			});

			$order->refresh();

			$product = $order->products()->where('product_id', $data['itemId'])->first();

			$itemTotalPrice =   $product->pivot->quantity * $product->getOrderProductFinalPrice($product->pivot->base_unit_price, $product->pivot->discount, $product->pivot->vat);

			return [
				'itemTotalPrice' => $itemTotalPrice,
				'totalValue' => $order->getTotalValueAttribute(),
				'totalQuantity' => $order->getTotalQuantityAttribute(),
				'updatedAt' => $order->updated_at
			];
		} catch (\Exception $ex) {
			throw new \Exception($ex);
			// throw new \Exception('Something went wrong');
		}
	}
}
