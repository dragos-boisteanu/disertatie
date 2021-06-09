<?php

namespace App\Interfaces;

interface TableServiceInterface 
{
  public function setStatus(int $tableId, int $statusId): Void;
}