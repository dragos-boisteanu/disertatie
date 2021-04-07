<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stock extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'quantity',
    ];

    public function product() 
    {
        return $this->hasOne('App\Models\Product');
    }

    public function ingredient() 
    {
        return $this->hasOne('App\Models\Ingredient');
    }

}
