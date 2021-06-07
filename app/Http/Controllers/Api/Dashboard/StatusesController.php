<?php

namespace App\Http\Controllers\Api\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\OrderStatus;

class StatusesController extends Controller
{
    public function getOrdersStatuses()
    {
        $orderStatuses = OrderStatus::all();

        return $orderStatuses;
    }
}
