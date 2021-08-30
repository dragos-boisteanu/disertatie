<?php

namespace App\Http\Controllers\Api\Dashboard;

use App\Models\Reservation;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Jobs\ReservationStatusUpdated;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class UpdateReservationStatus extends Controller
{
	/**
	 * Handle the incoming request.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function __invoke(Request $request, int $id)
	{
		try {
			$reservation = Reservation::findOrFail($id);

			$oldStatus = $reservation->status;

			$reservation->status_id = $request->statusId;

			$reservation->save();

			$reservation->refresh();

			dispatch((new ReservationStatusUpdated($reservation, $oldStatus))->onQueue('email'));

			debug($oldStatus);
			return response()->json(['message' => 'Reservation status updated', 'status' => $reservation->status], 200);
		} catch (ModelNotFoundException $e) {
			debug($e);
			return response()->json(['message' => 'No reservation found'], 404);
		} catch (\Exception $e) {
			debug($e);
			return response()->json(['message' => 'Something went wrong, try again later'], 500);
		}
	}
}
