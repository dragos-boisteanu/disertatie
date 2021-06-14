<?php

namespace App\Http\Resources;

use App\Http\Resources\IngredientCollection;
use Illuminate\Http\Resources\Json\JsonResource;

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
            'finalPrice' => $this->price,
            'vat' => $this->category->vat,
            'weight' => $this->weight,
            'unitId' => $this->unit_id,
            'categoryId' => $this->category_id,
            'subCategoryId' => $this->sub_category_id,
            'quantity' => $this->quantity,
            'deletedAt' => $this->deleted_at
        ];

        if($this->has_ingredients) {
            $arrayData['hasIngredients'] = $this->has_ingredients;
            $arrayData['ingredients'] = new IngredientCollection($this->ingredients);
        }else {
            $arrayData['ingredients'] = array();
        }

        if($this->relationLoaded('discount')) {
            $arrayData['discount'] = new DiscountProduct($this->discount);
        } else if($this->category->relationLoaded('discount')) {
            $arrayData['discount'] = new DiscountProduct($this->category->discount);
        }

        return $arrayData;
    }
}
