<?php


namespace App\Services;

use App\Interfaces\ReservationInterface;

class ReservationService implements ReservationInterface
{
  public function checkAvailableTables(string $date, string $time, int $seats): bool
  {
    
    return false;
  }
}