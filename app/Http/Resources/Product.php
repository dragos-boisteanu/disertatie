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
            'base_price' => $this->base_price,
            'finalPrice' => $this->price,
            'vat' => $this->category->vat,
            'weight' => $this->weight,
            'unit_id' => $this->unit_id,
            'category_id' => $this->category_id,
            'quantity' => $this->quantity,
            'hasIngredients' => $this->has_ingredients,
            'ingredients' => new IngredientCollection($this->whenLoaded('ingredients')),
            'deleted_at' => $this->deleted_at
        ];


        if(!is_null($this->discount)) {
            $arrayData['discount'] = new DiscountProduct($this->discount);
            $arrayData['discountStartsAt'] = $this->discounted_from_date;
            $arrayData['discountEndsAt'] = $this->discounted_until_date;
        }

        return $arrayData;
    }
}
