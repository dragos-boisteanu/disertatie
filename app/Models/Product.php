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
        'discount_id',
        'discounted_from_date',
        'discounted_until_date',
    ];

    public $with = ['unit', 'stock', 'category', 'ingredients'];

    protected $appends = array('finalPrice', 'quantity');

    public function getPriceAttribute()
    {
        if($this->discount) {
            $finalPrice = $this->base_price - $this->base_price * ($this->discount->value / 100);
        } else {
            $finalPrice = $this->base_price;
        }

        $finalPrice += $finalPrice * ($this->category->vat / 100);

        return round($finalPrice, 2);
    }

    public function getQuantityAttribute() 
    {
        if($this->has_ingredients) {

            $ingredients = $this->ingredients;

            $quantityArray = array();
            
            foreach($ingredients as $ingredient) {
                $howManyProductsCanBeMadeFromThisIngredient = floor($ingredient->stock->quantity / $ingredient->pivot->quantity);
                if($howManyProductsCanBeMadeFromThisIngredient === 0) {
                    $quantity = 0;
                    return $quantity;
                }else {
                    array_push($quantityArray, $howManyProductsCanBeMadeFromThisIngredient);
                }
            }

            $quantity = min($quantityArray);
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

    public function discount() 
    {
        return $this->belongsTo(Discount::class);
    }

    public function scopeFilter(Builder $builder, Request $request)
    {
        return (new ProductFilter($request))->filter($builder);
    }
}
