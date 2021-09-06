<?php

namespace App\Http\Controllers\Web\Client;

use Carbon\Carbon;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Barryvdh\Debugbar\Facade as Debugbar;
use App\Interfaces\ReservationServiceInterface;
use App\Exceptions\NoAvailabeTablesForReservationException;
use Brian2694\Toastr\Facades\Toastr;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ReservationController extends Controller
{

	private $reservationService;

	public function __construct(ReservationServiceInterface $reservatioService)
	{
		$this->reservationService = $reservatioService;
	}

	/**
	 * Display a listing of the resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function index(Request $request)
	{
		$orderBy = 1;

		if ($request->has('orderBy')) {
			$orderBy = $request->orderBy;
		}

		$reservations = $this->reservationService->getAllReservations(5, $orderBy, $request->all(), Auth::id());
		return view('store.reservations.index', compact('reservations', 'orderBy'));
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function store(Request $request)
	{

		try {
			DB::beginTransaction();

			$input = $request->all();

			$input['client_id'] = Auth::id();
			$input['client_name'] = Auth::user()->fullName;
			$input['phone_number'] = Auth::user()->phone_number;
			$input['email'] = Auth::user()->email;

			$input['begins_at'] = Carbon::createFromFormat('d-m-Y H:i', $request->date . ' ' . $request->time)->subMinutes(30);
			$input['ends_at'] = Carbon::createFromFormat('d-m-Y H:i', $request->date . ' ' . $request->time)->addHours(3);

			$input['status_id'] = 1;

			$availableTables = $this->reservationService->getAvailableTables($request->date, $request->time, $request->seats);

			$this->reservationService->create($input, $availableTables);

			DB::Commit();

			Toastr::success("Reservarea a fost inregistrata. Va asteptam !", "Succes");
			return redirect()->back();
		} catch (NoAvailabeTablesForReservationException $ex) {
			DB::rollBack();
			Toastr::error($ex->getMessage(), "Eroare");

			return redirect()->back()->withInput();
		} catch (\Exception $ex) {
			DB::rollBack();

			Toastr::error('A aparut o problema. Incercati mai tarziu', "Eroare");
			return redirect()->back()->withInput();
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
			$reservation = Reservation::with('tables', 'client', 'staff')->withTrashed()->where('id', $id)->where('client_id', Auth::id())->firstOrFail();
			$canCancel = false;

			$diff_in_hours = Carbon::now()->diffInHours($reservation->begins_at);

			$canCancel = false;

			if ($diff_in_hours > 24 && !isset($reservation->deleted_at)) {
				$canCancel = true;
			}

			return view('store.reservations.show', compact('reservation', 'canCancel'));
		} catch (ModelNotFoundException $e) {
			debug($e);
			Toastr::error('Reservarea nu a fost gasita', 'Eroare');
			return redirect()->back();
		} catch (\Exception $e) {
			debug($e);
			Toastr::error('A aparut o problema. Incercati mai tarziu', "Eroare");
			return redirect()->back();
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

			$reservation = Reservation::with('client')->where('id', $id)->where('client_id', Auth::id())->firstOrFail();

			$diff_in_hours = Carbon::now()->diffInHours($reservation->begins_at);

			if ($diff_in_hours > 24) {
				DB::beginTransaction();

				$reservation->status_id = 4;
				$reservation->save();
				$reservation->delete();

				DB::commit();
				Toastr::success('Reservarea a fost anulata', 'Succes');
				return redirect()->back();
			} else {
				Toastr::info('Rezervarea se poate anula doar cu 24 de ore inainte de ora la care incepe.', 'Succes');
				return redirect()->back();
			}
		} catch (ModelNotFoundException $e) {
			debug($e);
			Toastr::error('Reservarea nu a fost gasita', 'Eroare');
			return redirect()->back();
		} catch (\Exception $e) {
			debug($e);
			Toastr::error('A aparut o problema. Incercati mai tarziu', "Eroare");
			return redirect()->back();
		}
	}
}
