<?php

namespace App\Interfaces;

use Illuminate\Support\Collection;


interface ReservationServiceInterface
{
  public function checkAvailableTables(string $date, string $time, int $seats): bool;
  public function getAvailableTables(string $date, string $time, int $seats);
  // public function createReservation(string $date, string $time, int $seats): Reservation;
  // public function removeReservation(int $reservationId): Boolean;
  // public function updateReservationStatus(int $resetvationId, int $statusId): Boolean;
}