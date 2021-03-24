<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use HasFactory, SoftDeletes;

    public $timestamps = false;

    protected $fillable = [
        'barcode',
        'name',
        'description',
        'category_id',
        'unit_price',
        'vat',
        'weight',
        'unit_id',
    ];

    public $with = ['stock:quantity'];

    public function getUnitPriceAttribute($value)
    {
        return str_replace('.', ',', $value);
    }

    public function category() 
    {
        return $this->belongsTo('App\Models\Category');
    }

    public function stock() 
    {
        return $this->hasOne('App\Models\Stock');
    }

    public function unit()
    {
        return $this->hasOne('App\Models\Unit');
    }

    public function ingredients() {
        return $this->belongsToMany('App\Models\Ingredients');
    }
}
