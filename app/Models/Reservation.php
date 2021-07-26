<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Reservation extends Model
{
    use HasFactory, SoftDeletes;


    protected $fillable = [
        'client_id',
        'seats',
        'client_name',
        'phone_number',
        'email',
        'begins_at',
        'ends_at',
        'status_id',
				'staff_id',
    ];


    public function tables()
    {
        return $this->belongsToMany(Table::class);
    }

    public function status() 
    {
        return $this->belongsTo(ReservationStatus::class);
    }

    public function client()
    {
        return $this->hasOne(User::class, 'id', 'client_id');
    }

    public function staff()
    {
        return $this->hasOne(User::class, 'id', 'staff_id');
    }
}
