<?php

namespace App\Http\Controllers\Api\Dashboard;

use App\Models\Order;
use App\Models\OrderStatus;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Interfaces\OrderServiceInterface;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class OrderStatusController extends Controller
{

	private $orderService;

	public function __construct(OrderServiceInterface $orderService)
	{
		$this->orderService = $orderService;
	}

	public function __invoke(Request $request, $id)
	{
		try {

			$order = Order::findOrFail($id);

			$this->authorize('updateStatus', $order);

			$order = $this->orderService->updateStatus($request->status['id'], $order);

			return response()->json([
				'updatedAt' => $order->updated_at,
				'status' => $order->status
			]);
		} catch (ModelNotFoundException $me) {
			return  response()->json(['message' => 'No order found with id #' . $id], 404);
		} catch (AuthorizationException $e) {
			return  response()->json(['message' => $e->getMessage()], 403);
		} catch (\Exception $e) {
			return  response()->json(['message' => $e->getMessage()], 500);
		}
	}
}
