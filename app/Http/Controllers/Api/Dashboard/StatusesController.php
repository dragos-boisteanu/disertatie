<?php

namespace App\Http\Controllers\Api\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\OrderStatus;
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

        return $tableStatuses;
    }
}
