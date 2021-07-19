<?php

namespace App\Http\Controllers\Api\Client;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\AvailableTablesRequest;

class ReservationsController extends Controller
{
    public function getAvailableTables(AvailableTablesRequest $request)
    {
        
        return response()->json(['date' => $request->date, 'time'=> $request->time, 'seats' => $request->seats], 200);
    }
}
