<?php

namespace App\Models;

use Illuminate\Support\Carbon;
use App\Filters\Product\ProductFilter;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Cviebrock\EloquentSluggable\SluggableScopeHelpers;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
	use HasFactory, SoftDeletes, Sluggable, SluggableScopeHelpers;

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
		'discount_id',
	];

	public $with = ['unit', 'stock', 'category', 'subCategory', 'ingredients', 'discount'];

	protected $appends = array('price', 'priceWithoutDiscount', 'quantity', 'finalDiscount', 'vat');

	public function sluggable(): array
	{
		return [
			'slug' => [
				'source' => ['name', 'weight', 'unit.name']
			]
		];
	}

	public function getFinalDiscountAttribute()
	{
		$finalDiscount = null;

		if (isset($this->discount) && ($this->discount->starts_at->lte(Carbon::now())  &&  $this->discount->ends_at->gte(Carbon::now()))) {
			$finalDiscount = $this->discount->value;
		} else if (isset($this->subCategory->discount) && ($this->subCategory->discount->starts_at->lte(Carbon::now())  &&  $this->subCategory->discount->ends_at->gte(Carbon::now()))) {
			$finalDiscount = $this->subCategory->discount->value;
		} else if (isset($this->category->discount) && ($this->category->discount->starts_at->lte(Carbon::now())  &&  $this->category->discount->ends_at->gte(Carbon::now()))) {
			$finalDiscount = $this->category->discount->value;
		}

		return $finalDiscount;
	}

	public function getVatAttribute()
	{
		$vat = 0;

		if (isset($this->sub_category_id)) {
			$vat = $this->subCategory->vat;
		} else {
			$vat = $this->category->vat;
		}

		return $vat;
	}

	public function getPriceAttribute()
	{
		$finalPrice = 0;

		if (isset($this->discount) && ($this->discount->starts_at->lte(Carbon::now())  &&  $this->discount->ends_at->gte(Carbon::now()))) {
			$finalPrice = $this->calculateDiscount($this->base_price, ($this->discount->value));
		} else if (isset($this->subCategory->discount) && ($this->subCategory->discount->starts_at->lte(Carbon::now())  &&  $this->subCategory->discount->ends_at->gte(Carbon::now()))) {
			$finalPrice = $this->calculateDiscount($this->base_price, ($this->subCategory->discount->value));
		} else  if (isset($this->category->discount) && ($this->category->discount->starts_at->lte(Carbon::now())  &&  $this->category->discount->ends_at->gte(Carbon::now()))) {
			$finalPrice = $this->calculateDiscount($this->base_price, ($this->category->discount->value));
		} else {
			$finalPrice = $this->base_price;
		}

		$finalPrice = $this->calculateVat($finalPrice, $this->vat);

		return number_format($finalPrice, 2, '.', '');
	}

	public function getPriceWithoutDiscountAttribute()
	{
		$finalPrice = $this->calculateVat($this->base_price, $this->vat);

		return number_format($finalPrice, 2, '.', '');
	}

	public function getQuantityAttribute()
	{
		if ($this->has_ingredients) {

			$ingredients = $this->ingredients;

			$quantityArray = array();

			foreach ($ingredients as $ingredient) {
				$howManyProductsCanBeMadeFromThisIngredient = floor($ingredient->stock->quantity / $ingredient->pivot->quantity);
				if ($howManyProductsCanBeMadeFromThisIngredient === 0) {
					$quantity = 0;
					return $quantity;
				} else {
					array_push($quantityArray, $howManyProductsCanBeMadeFromThisIngredient);
				}
			}

			$quantity = min($quantityArray);
		} else {
			$quantity = $this->stock->quantity;
		}

		return $quantity;
	}

	private function calculateVat($price, $vat)
	{
		return $price + $price * $vat / 100;
	}

	private function calculateDiscount($basePrice, $discount)
	{
		return $basePrice - $basePrice * ($discount / 100);
	}

	public function category()
	{
		return $this->belongsTo('App\Models\Category')->withTrashed();
	}

	public function subCategory()
	{
		return $this->belongsTo(Category::class, 'sub_category_id')->withTrashed();
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

	public function orders()
	{
		return $this->belongsToMany(Order::class);
	}

	public function scopeFilter(Builder $builder, array $data)
	{
		return (new ProductFilter($data))->filter($builder);
	}

	public function getOrderProductFinalPrice($baesUnitPrice, $discount, $vat)
	{
		$finalPrice = 0;

		$finalPrice = $this->calculateDiscount($baesUnitPrice, $discount);

		$finalPrice = $this->calculateVat($finalPrice, $vat);

		return number_format($finalPrice, 2, '.', '');
	}
}
