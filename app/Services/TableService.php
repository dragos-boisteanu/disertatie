<?php


namespace App\Services;

use App\Models\Table;
use App\Interfaces\TableServiceInterface;
use Exception;

class TableService implements TableServiceInterface 
{
  public function setStatus(int $tableId, int $statusId): void
  {
    try {
      
      $table = Table::findOrFail($tableId);

      $table->status_id = $statusId;

      $table->save();
    } catch ( \Exception $e) {
      throw new Exception('Failed to update table status');
    }
    
  }
}