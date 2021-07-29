<?php

namespace App\Http\Controllers\Api\Dashboard;

use Carbon\Carbon;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Http\Requests\ReservationRequest;
use App\Http\Resources\ReservationCollection;
use App\Interfaces\ReservationServiceInterface;
use App\Http\Resources\ReservationListCollection;
use App\Exceptions\NoAvailabeTablesForReservationException;
use App\Http\Resources\Reservation as ResourcesReservation;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ReservationController extends Controller
{

	private $reservationService;

	public function __construct(ReservationServiceInterface $reservationService)
	{
		$this->reservationService = $reservationService;
	}

	/**
	 * Display a listing of the resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function index(Request $request)
	{
		$reservations = $this->reservationService->getAllReservations(15, $request->orderBy, $request->all());

		return new ReservationListCollection($reservations);
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function store(ReservationRequest $request)
	{
		debug($request->all());

		try {
			DB::beginTransaction();

			$input = [];

			$input['client_id'] = $request->clientId;
			$input['client_name'] = $request->firstName . ' ' . $request->lastName;
			$input['phone_number'] = $request->phoneNumber;

			if ($request->has('email')) {
				$input['email'] = $request->email;
			}

			$input['staff_id'] = $request->user()->id;
			$input['seats'] = $request->seats;
			$input['status_id'] = 1;

			$input['begins_at'] = Carbon::createFromFormat('d-m-Y H:i', $request->date . ' ' . $request->time)->subMinutes(30);
			$input['ends_at'] = Carbon::createFromFormat('d-m-Y H:i', $request->date . ' ' . $request->time)->addHours(3);

			$availableTables = $this->reservationService->getAvailableTables($request->date, $request->time, $request->seats);

			$reservation = $this->reservationService->create($input, $availableTables);

			DB::commit();

			return response()->json(['message' => "Reservation created with id: " . $reservation->id], 201);
		} catch (NoAvailabeTablesForReservationException $ex) {
			DB::rollBack();
			debug($ex);

			return response()->json(['message' => $ex->getMessage()], 400);
		} catch (\Exception $ex) {
			DB::rollBack();
			debug($ex);
			return response()->json(['message' => 'Something went wrong, try again later'], 500);
		}
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
			$reservation = Reservation::withTrashed()->findOrFail($id);

			return new ResourcesReservation($reservation);
		} catch (ModelNotFoundException $e) {
			debug($e);
			return response()->json(['message' => 'No reservation found'], 404);
		} catch (\Exception $e) {
			debug($e);
			return response()->json(['message' => 'Something went wrong, try again later'], 500);
		}
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return \Illuminate\Http\Response
	 */
	public function destroy($id)
	{
		try {

			DB::beginTransaction();

			$reservation = Reservation::withTrashed()->findOrFail($id);

			$reservation->status_id = 4;
			$reservation->save();

			$reservation->delete();

			$reservation->refresh();

			DB::commit();
			return response()->json(['message' => 'Reservation canceled', 'deletedAt' => $reservation->deleted_at, 'status' => $reservation->status], 200);
		} catch (ModelNotFoundException $e) {
			debug($e);
			return response()->json(['message' => 'No reservation found'], 404);
		} catch (\Exception $e) {
			debug($e);
			return response()->json(['message' => 'Something went wrong, try again later'], 500);
		}
	}
}
