<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Ingredient extends Model
{
    use HasFactory, SoftDeletes;

    public $timestamps = false;

    protected $fillable = [
        'name',
        'stock_id',
        'unit_id',
    ];

    public function unit() 
    {
        return $this->hasOne('App\Models\Unit');
    }

    public function stock()
    {
        return $this->hasOne('App\Models\Stock');
    }

    public function products() 
    {
        return $this->belongsToMany('App\Models\Product');
    }
}
