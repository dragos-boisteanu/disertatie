<?php

namespace App\Http\Controllers\Api\Client;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\AvailableTablesRequest;
use App\Interfaces\ReservationServiceInterface;

class ReservationsController extends Controller
{
    private $reservationService;

    public function __construct(ReservationServiceInterface $reservationService) 
    {
        $this->reservationService = $reservationService;
    }

    public function getAvailableTables(AvailableTablesRequest $request)
    {
        $this->reservationService->checkAvailableTables($request->date, $request->time, $request->seats);
        
        return response()->json(['date' => $request->date, 'time'=> $request->time, 'seats' => $request->seats], 200);
    }
}
