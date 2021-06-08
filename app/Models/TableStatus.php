<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TableStatus extends Model
{
    use HasFactory;

    public $timestamps = false;

    public function tables() 
    {   
        return $this->belongsToMany(Table::class);
    }
}
