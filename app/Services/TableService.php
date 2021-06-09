<?php


namespace App\Services;

use App\Models\Table;
use App\Interfaces\TableServiceInterface;
use App\Models\TableStatus;
use Exception;

class TableService implements TableServiceInterface 
{
  public function setStatus(int $tableId, int $statusId): void
  {
    try {
      
      $table = Table::withTrashed()->findOrFail($tableId);

      $table->status_id = $statusId;

      $table->save();
    } catch ( \Exception $e) {
      throw new Exception('Failed to update table status');
    }
  }

  public function getStatusById(int $statusId): TableStatus
  {
    try {
      $tableStatus = TableStatus::findOrFail($statusId);

      return $tableStatus;
    } catch ( \Exception $e) {
      throw new Exception('No table status with id ' . $statusId . ' found');
    }
    
  }
}
