<?php

namespace App\Interfaces;

use App\Models\TableStatus;

interface TableServiceInterface 
{
  public function setStatus(int $tableId, int $statusId): Void;
  public function getStatusById(int $statusId): TableStatus;
}