<?php

namespace App\Http\Controllers\Api\Client;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\AvailableTablesRequest;
use App\Interfaces\ReservationServiceInterface;
use App\Exceptions\NoAvailabeTablesForReservationException;

class ReservationsController extends Controller
{
    private $reservationService;

    public function __construct(ReservationServiceInterface $reservationService)
    {
        $this->reservationService = $reservationService;
    }

    public function getAvailableTables(AvailableTablesRequest $request)
    {
        try {
            $this->reservationService->checkAvailableTables($request->date, $request->time, $request->seats);
            return response()->json(['tableMessage' => 'Exista mese disponobile pentru reservare'], 200);
        } catch (NoAvailabeTablesForReservationException $ex) {
            return response()->json(['tableMessage' => $ex->getMessage()], 400);
        } catch (\Exception $ex) {
            return response()->json(['error' => $ex->getMessage()], 400);
        }
    }
}
