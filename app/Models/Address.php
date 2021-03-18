<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'first_name',
        'name',
        'phone_number',
        'county_id',
        'city_id',
        'address'
    ];

    public function user() 
    {
        return $this->belongsTo(User::class);
    }
}
