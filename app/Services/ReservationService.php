<?php


namespace App\Services;

use Exception;
use Carbon\Carbon;
use App\Models\Table;
use Illuminate\Support\Facades\DB;
use App\Interfaces\ReservationServiceInterface;

class ReservationService implements ReservationServiceInterface
{
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
        throw new Exception('Numarul de locuri necesare depaseste numarul de locul disponibile');
      }

      debug('available tables ' . $availableTables);

      $selectedTables = [];

      while ($seats > 0) {
        if ($seats < $availableTables->min('seats')) {
          $table = $availableTables->where('seats', '>=', $seats)->sortBy('seats')->shift();
        } else {
          $table = $availableTables->where('seats', '<=', $seats)->sortByDesc('seats')->shift();
        }

        array_push($selectedTables, $table);

        $seats -= $table->seats;
      }

      debug('seleted tables ' . json_encode($selectedTables));
    } catch (\Exception $ex) {
      debug($ex->getMessage());
    }

    return false;
  }

  public function getAvailableTables(string $date, string $time, int $seats)
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
        throw new Exception('Numarul de locuri necesare depaseste numarul de locul disponibile');
      }

      debug('available tables ' . $availableTables);

      $selectedTables = [];

      while ($seats > 0) {
        if ($seats < $availableTables->min('seats')) {
          $table = $availableTables->where('seats', '>=', $seats)->sortBy('seats')->shift();
        } else {
          $table = $availableTables->where('seats', '<=', $seats)->sortByDesc('seats')->shift();
        }

        array_push($selectedTables, $table);

        $seats -= $table->seats;
      }

      debug('seleted tables ' . json_encode($selectedTables));
       
      return $selectedTables;
    } catch (\Exception $ex) {
      debug($ex->getMessage());
      throw new Exception("Error Processing Request", 1);
    }
  }
}
