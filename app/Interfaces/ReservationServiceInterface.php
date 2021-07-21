<?php

namespace App\Interfaces;

use App\Models\Reservation;
use Illuminate\Support\Collection;


interface ReservationServiceInterface
{
  public function checkAvailableTables(string $date, string $time, int $seats): bool;
  public function getAvailableTables(string $date, string $time, int $seats): array;
  public function create(array $data, array $tables): Reservation;
  // public function removeReservation(int $reservationId): Boolean;
  // public function updateReservationStatus(int $resetvationId, int $statusId): Boolean;
}