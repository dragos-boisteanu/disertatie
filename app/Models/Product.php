<?php

namespace App\Models;

use Illuminate\Http\Request;
use App\Filters\Product\ProductFilter;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
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
        'has_ingredients',
    ];

    public $with = ['unit', 'stock', 'category', 'ingredients'];

    protected $appends = array('price', 'quantity');

    public function getPriceAttribute()
    {
        $price = $this->base_price + $this->base_price * ($this->category->vat / 100);

        return $price;
    }

    public function getQuantityAttribute() 
    {
        if($this->has_ingredients) {
            $todalQuantityofIngredientsInStock = 0;
            $totalQuantityOfNeededIngredients = 0;

            $ingredients = $this->ingredients;
            foreach($ingredients as $ingredient) {
                $todalQuantityofIngredientsInStock += $ingredient->stock->quantity;
                $totalQuantityOfNeededIngredients += $ingredient->pivot->quantity;
            }

            if($totalQuantityOfNeededIngredients > 0) {
                $quantity = floor($todalQuantityofIngredientsInStock / $totalQuantityOfNeededIngredients);
            } else {
                $quantity = 0;
            }
        } else {
            $quantity = $this->stock->quantity;
        }

        return $quantity;
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
        return $this->belongsTo('App\Models\Unit');
    }

    public function ingredients() 
    {
        return $this->belongsToMany('App\Models\Ingredient')->withPivot('quantity');
    }

    public function scopeFilter(Builder $builder, Request $request)
    {
        return (new ProductFilter($request))->filter($builder);
    }
}
