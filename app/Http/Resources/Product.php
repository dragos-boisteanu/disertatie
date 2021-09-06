<?php

namespace App\Http\Resources;

use App\Http\Resources\IngredientCollection;
use Illuminate\Http\Resources\Json\JsonResource;
use Barryvdh\Debugbar\Facade as Debugbar;

class Product extends JsonResource
{
	/**
	 * Transform the resource into an array.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return array
	 */
	public function toArray($request)
	{

		$arrayData = [
			'id' => $this->id,
			'image' => $this->image,
			'name' => $this->name,
			'barcode' => $this->barcode,
			'description' => $this->description,
			'basePrice' => $this->base_price,
			'discount' => $this->finalDiscount,
			'vat' => $this->vat,
			'weight' => $this->weight,
			'unit' => $this->unit->name,
			'categoryId' => $this->category_id,
			'subCategoryId' => $this->sub_category_id,
			'quantity' => $this->quantity,
			'deletedAt' => $this->deleted_at
		];

		DebugBar::info($arrayData);

		if ($this->has_ingredients) {
			$arrayData['hasIngredients'] = $this->has_ingredients;
			$arrayData['ingredients'] = new IngredientCollection($this->ingredients);
		} else {
			$arrayData['ingredients'] = array();
		}

		return $arrayData;
	}
}
