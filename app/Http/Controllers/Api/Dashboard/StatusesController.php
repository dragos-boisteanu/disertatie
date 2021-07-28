<?php

namespace App\Http\Controllers\Api\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\OrderStatus;
use App\Models\ReservationStatus;
use App\Models\TableStatus;

class StatusesController extends Controller
{
	public function getOrdersStatuses()
	{
		$orderStatuses = OrderStatus::all();

		return $orderStatuses;
	}

	public function getTableStatuses()
	{
		$tableStatuses = TableStatus::all();

		return response()->json(['statuses' => $tableStatuses], 200);
	}

	public function getReservationStatuses()
	{
		$reservationStatuses = ReservationStatus::where('name', '!=', 'Canceled')->get();

		return response()->json($reservationStatuses, 200);
	}
}
