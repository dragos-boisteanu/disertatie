<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProductEdit extends JsonResource
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
            'base_price' => $this->base_price,
            'finalPrice' => $this->price,
            'vat' => $this->category->vat,
            'weight' => $this->weight,
            'unit_id' => $this->unit_id,
            'category_id' => $this->category_id,
            'quantity' => $this->quantity,
            'deleted_at' => $this->deleted_at,
        ];

        if($this->has_ingredients) {
            $arrayData['hasIngredients'] = $this->has_ingredients;
            $arrayData['ingredients'] = new IngredientCollection($this->ingredients);
        }else {
            $arrayData['ingredients'] = array();
        }

        if($this->disocunt) {
            $arrayData['discountId'] = $this->discount->id;
        }

        return $arrayData;
    }
}
