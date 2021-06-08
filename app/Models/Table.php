<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Table extends Model
{
    use HasFactory;

    public $timestamps = false;

    public function orders()
    {
        return $this->belongsToMany(Order::class);
    }

    public function status()
    {
        return $this->hasOne(TableStatus::class);
    }



}
