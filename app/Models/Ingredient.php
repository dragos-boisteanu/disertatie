<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Ingredient extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'name',
        'stock_id',
        'unit_id',
    ];

    public $with = ['unit', 'stock'];

    public function unit() 
    {
        return $this->belongsTo('App\Models\Unit');
    }

    public function stock() 
    {
        return $this->belongsTo('App\Models\Stock');
    }

    public function products() 
    {
        return $this->belongsToMany('App\Models\Product');
    }
}
