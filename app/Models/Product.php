<?php

namespace App\Models;

use Illuminate\Http\Request;
use App\Filters\User\UserFilter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
    use HasFactory, SoftDeletes;

    public $timestamps = false;

    protected $fillable = [
        'barcode',
        'name',
        'description',
        'category_id',
        'base_price',
        'vat',
        'weight',
        'unit_id',
        'stock_id',
    ];

    public $with = ['stock:quantity', 'category'];

    protected $appends = array('price');

    public function getBasePriceAttribute($value)
    {
        return str_replace('.', ',', $value);
    }

    public function getPriceAttribute()
    {
        $price = $this->base_price + $this->base_price * ($this->category->vat / 100);

        return str_replace('.', ',', $price);
    }

    public function category() 
    {
        return $this->belongsTo('App\Models\Category');
    }

    public function stock() 
    {
        return $this->belongsTo('App\Models\Stock');
    }

    public function unit()
    {
        return $this->hasOne('App\Models\Unit');
    }

    public function ingredients() {
        return $this->belongsToMany('App\Models\Ingredients');
    }

    public function scopeFilter(Builder $builder, Request $request)
    {
        return (new UserFilter($request))->filter($builder);
    }
}
