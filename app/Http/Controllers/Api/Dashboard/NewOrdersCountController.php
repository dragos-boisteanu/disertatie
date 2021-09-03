<?php

namespace App\Http\Controllers\Api\Dashboard;

use App\Models\Order;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class NewOrdersCountController extends Controller
{
	/**
	 * Handle the incoming request.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function __invoke()
	{
		$newOrdersCount = Order::whereNull('staff_id')->count();

		return response()->json(['newOrdersCount' => $newOrdersCount], 200);
	}
}
