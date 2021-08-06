<?php


namespace App\Services;

use Exception;
use Carbon\Carbon;
use App\Models\Table;
use App\Models\Reservation;
use Illuminate\Support\Facades\DB;
use App\Jobs\SendReservationEmailJob;
use Illuminate\Support\Facades\Queue;
use App\Interfaces\ReservationServiceInterface;
use App\Exceptions\NoAvailabeTablesForReservationException;
use Illuminate\Pagination\LengthAwarePaginator;

class ReservationService implements ReservationServiceInterface
{

	public function getAllReservations(int $perPage = 8, int $orderBy = null, array $data, int $authClientId = null): LengthAwarePaginator
	{
		try {

			$query = Reservation::withTrashed();

			if (isset($authClientId)) {
				$query->where('client_id', $authClientId);
			}

			switch ($orderBy) {
				case 1:
					$query->orderBy('created_at', 'desc');
					break;
				case 2:
					$query->orderBy('created_at', 'asc');
					break;
				default:
					$query->orderBy('created_at', 'desc');
			}

			$query->orderBy('id', 'asc');;

			$reservations = $query->with(['tables', 'client', 'staff'])->filter($data)->paginate($perPage);

			return $reservations;
		} catch (\Exception $e) {
			debug($e);
			throw new Exception('Something went wrong, try again later');
		}
	}


	public function checkAvailableTables(string $date, string $time, int $seats): bool
	{

		try {
			$beginsAt = Carbon::createFromFormat('d-m-Y H:i', $date . ' ' . $time);
			$endsAt = Carbon::createFromFormat('d-m-Y H:i', $date . ' ' . $time)->subMinutes(30);

			$availableTables = Table::whereNotIn(
				'id',
				DB::table('tables')
					->distinct()
					->select('tables.id')
					->join('reservation_table', 'reservation_table.table_id', '=', 'tables.id')
					->join('reservations', 'reservations.id', '=', 'reservation_table.reservation_id')
					->where('reservations.begins_at', '<=', $beginsAt->toDateTimeString())
					->where('reservations.ends_at', '>', $endsAt->toDateTimeString())
					->where('reservations.status_id', 1)
					->orWhere('reservations.status_id', 2)
					->whereNull('reservations.deleted_at')
					->pluck('id')->toArray()
			)
				->orderBy('seats', 'desc')
				->get(['id', 'seats']);


			$totalSeats = 0;

			// only add the table if the number of seats of all selected tables is equal or smaller than
			// the neeeded number of steas or
			// if the number is about the needed amount but by much
			// t1: 2s, t2: 6s, t3:4s, rs: 5 -> select t1 and t3, ignore t2, rs: 6 -> select t2, ignore t1 and t3

			foreach ($availableTables as $table) {
				$totalSeats += $table->seats;
			}

			if ($totalSeats < $seats) {
				throw new NoAvailabeTablesForReservationException('Nu sunt mese disponibile pentru rezervare. Alegeti alta zi sau ora');
			}

			debug('available tables ' . $availableTables);

			$selectedTables = [];

			while ($seats > 0) {
				if ($seats < $availableTables->min('seats')) {
					$availableTables = $availableTables->where('seats', '>=', $seats);
					$table = $availableTables->shift();
				} else {
					$availableTables = $availableTables->where('seats', '<=', $seats);
					$table = $availableTables->pop();
				}

				array_push($selectedTables, $table);
				$seats -= $table->seats;
			}

			debug('seleted tables ' . json_encode($selectedTables));

			return false;
		} catch (NoAvailabeTablesForReservationException $ex) {
			debug($ex->getMessage());
			throw new NoAvailabeTablesForReservationException($ex->getMessage());
		} catch (\Exception $ex) {
			debug($ex->getMessage());
			throw new Exception("Error Processing Request", 1);
		}
	}

	public function getAvailableTables(string $date, string $time, int $seats): array
	{
		try {
			$beginsAt = Carbon::createFromFormat('d-m-Y H:i', $date . ' ' . $time);
			$endsAt = Carbon::createFromFormat('d-m-Y H:i', $date . ' ' . $time)->subMinutes(30);

			$availableTables = Table::whereNotIn(
				'id',
				DB::table('tables')
					->distinct()
					->select('tables.id')
					->join('reservation_table', 'reservation_table.table_id', '=', 'tables.id')
					->join('reservations', 'reservations.id', '=', 'reservation_table.reservation_id')
					->where('reservations.begins_at', '<=', $beginsAt->toDateTimeString())
					->where('reservations.ends_at', '>', $endsAt->toDateTimeString())
					->where('reservations.status_id', 1)
					->orWhere('reservations.status_id', 2)
					->whereNull('reservations.deleted_at')
					->pluck('id')->toArray()
			)
				->orderBy('seats', 'desc')
				->get(['id', 'seats']);


			$totalSeats = 0;

			// only add the table if the number of seats of all selected tables is equal or smaller than
			// the neeeded number of steas or
			// if the number is about the needed amount but by much
			// t1: 2s, t2: 6s, t3:4s, rs: 5 -> select t1 and t3, ignore t2, rs: 6 -> select t2, ignore t1 and t3

			foreach ($availableTables as $table) {
				$totalSeats += $table->seats;
			}

			if ($totalSeats < $seats) {
				throw new NoAvailabeTablesForReservationException('Nu s-au gasit mese disponibile pentru datele folosite');
			}

			debug('available tables ' . $availableTables);

			$selectedTables = [];

			while ($seats > 0) {
				if ($seats < $availableTables->min('seats')) {
					$availableTables = $availableTables->where('seats', '>=', $seats);
					$table = $availableTables->shift();
				} else {
					$availableTables = $availableTables->where('seats', '<=', $seats);
					$table = $availableTables->pop();
				}

				array_push($selectedTables, $table);

				$seats -= $table->seats;
			}

			debug('seleted tables ' . json_encode($selectedTables));

			return $selectedTables;
		} catch (NoAvailabeTablesForReservationException $ex) {
			debug($ex->getMessage());
			throw new NoAvailabeTablesForReservationException($ex->getMessage());
		} catch (\Exception $ex) {
			debug($ex->getMessage());
			throw new Exception("Error Processing Request", 1);
		}
	}

	public function create(array $data, array $tables): Reservation
	{

		$reservation = Reservation::create($data);

		foreach ($tables as $table) {
			$reservation->tables()->attach($table->id);
		}

		if (in_array('email', $data)) {
			Queue::push(new SendReservationEmailJob($reservation));
		}

		return $reservation;
	}
}
