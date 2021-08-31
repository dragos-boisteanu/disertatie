<?php

namespace App\Http\Controllers\Api\Dashboard;

use App\Models\Order;
use App\Events\NewMessage;
use Illuminate\Http\Request;
use App\Jobs\SendOrderEmailJob;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Queue;
use App\Http\Resources\OrderCollection;
use App\Http\Requests\OrderPatchRequest;
use App\Http\Requests\OrderStoreRequest;
use App\Interfaces\OrderServiceInterface;
use App\Http\Resources\OrderListCollection;
use App\Http\Requests\OrderPatchStatusRequest;
use App\Http\Resources\Order as OrderResource;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class OrderController extends Controller
{
	private $orderService;

	public function __construct(OrderServiceInterface $orderService)
	{
		$this->orderService = $orderService;
	}
	/**
	 * Display a listing of the resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function index(Request $request)
	{
		try {
			$orders = $this->orderService->getOrders(5, $request->orderBy, $request->all());
			return new OrderListCollection($orders);
		} catch (\Exception $ex) {
			return  response()->json(['message' => 'Something when wrong'], 500);
			// return  response()->json([ $ex->getMessage()], 500);
		}
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function store(OrderStoreRequest $request)
	{
		try {
			$this->authorize('create', Order::class);
			$this->orderService->create($request->validated(), $request->user()->id);

			return response()->json(['message' => 'Order created succesfully'], 201);
		} catch (\Exception $e) {
			DB::rollBack();
			return  response()->json(['message' => $e->getMessage()], 400);
		};
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return \Illuminate\Http\Response
	 */
	public function show($id)
	{
		try {
			$order = $this->orderService->getOrderById($id);

			$this->authorize('view', $order);

			if ((Auth::user()->isWaiter() || Auth::user()->isLocationManager() || Auth::user()->isAdminitrator()) && is_null($order->staff_id)) {
				$order = $this->orderService->linkStaffWithOrder(Auth::id(), $order);
				$order->load('staff');
			}

			return new OrderResource($order);
		} catch (ModelNotFoundException $me) {
			return  response()->json(['message' => $me->getMessage()], 404);
		} catch (AuthorizationException $e) {
			return  response()->json(['message' => $e->getMessage()], 403);
		} catch (\Exception $e) {
			return  response()->json(['message' => $e->getMessage()], 500);
		}
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  int  $id
	 * @return \Illuminate\Http\Response
	 */
	public function update(OrderPatchRequest $request, $id)
	{
		try {
			$order = Order::findOrFail($id);

			$this->authorize('update', $order);

			$order = $this->orderService->update($request->validated(), $order);

			return response()->json($order->updated_at, 200);
		} catch (ModelNotFoundException $me) {
			return  response()->json(['message' => 'No order found with id #' . $id], 404);
		} catch (AuthorizationException $e) {
			return  response()->json(['message' => $e->getMessage()], 403);
		} catch (\Exception $e) {
			return  response()->json(['message' => $e->getMessage()], 500);
		}
	}

	public function disable($id)
	{
		try {

			$order = Order::findOrFail($id);

			$this->authorize('disable', $order);

			$order = $this->orderService->disable($order);

			return response()->json([
				'deletedAt' => $order->deleted_at,
				'status' => $order->status,
			]);
		} catch (ModelNotFoundException $me) {
			return  response()->json(['message' => 'No order found with id #' . $id], 404);
			$this->authorize('updateStatus', $order);
		} catch (AuthorizationException $e) {
			return  response()->json(['message' => $e->getMessage()], 403);
		} catch (\Exception $e) {
			return  response()->json(['message' => $e->getMessage()], 500);
		}
	}
}
