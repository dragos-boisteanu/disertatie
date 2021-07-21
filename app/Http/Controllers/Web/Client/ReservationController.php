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
    public function index()
    {
        return view('store.reservations.index');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
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

            $input['client_name'] = Auth::user()->fullName;
            $input['phone_number'] = Auth::user()->phone_number;

            $input['begins_at'] = Carbon::createFromFormat('d-m-Y H:i', $request->date . ' ' . $request->time)->subMinutes(30);
            $input['ends_at'] = Carbon::createFromFormat('d-m-Y H:i', $request->date . ' ' . $request->time)->addHours(3);

            $input['status_id'] = 1;

            $availableTables = $this->reservationService->getAvailableTables($request->date, $request->time, $request->seats);

            $reservation = Reservation::create($input);

            foreach($availableTables as $table) {
                $reservation->tables()->attach($table->id);
            }

            DB::Commit();

            Toastr::success("Reservarea a fost inregistrata. V-a asteptam !", "Succes");
            return redirect()->back();

        } catch ( NoAvailabeTablesForReservationException $ex) {
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
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
