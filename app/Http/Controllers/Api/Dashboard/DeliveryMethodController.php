<?php

namespace App\Http\Controllers\Api\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\DeliveryMethod;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class DeliveryMethodController extends Controller
{
	/**
	 * Display a listing of the resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function index()
	{
		$deliveryMethods = DeliveryMethod::all();

		return $deliveryMethods;
	}
}
