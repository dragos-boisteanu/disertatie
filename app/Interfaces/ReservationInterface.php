<?php

namespace App\Interfaces;

use App\Models\Reservation;
use Illuminate\Support\Collection;


interface ReservationInterface
{
  public function checkAvailableTables(string $date, string $time, int $seats): bool;
  // public function getAvailableTables(string $date, string $time, int $seats): Collection;
  // public function createReservation(string $date, string $time, int $seats): Reservation;
  // public function removeReservation(int $reservationId): Boolean;
  // public function updateReservationStatus(int $resetvationId, int $statusId): Boolean;
}