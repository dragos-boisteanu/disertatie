<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Table extends Model
{
    use HasFactory, SoftDeletes;

    public $timestamps = false;

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function status()
    {
        return $this->belongsTo(TableStatus::class);
    }

    public function reservations()
    {
        return $this->belongsToMany(Reservation::class);
    }
}
