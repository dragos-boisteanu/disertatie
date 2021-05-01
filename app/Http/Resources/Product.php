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
            'deleted_at' => $this->deleted_at
        ];

        if($this->has_ingredients) {
            $arrayData['hasIngredients'] = $this->has_ingredients;
            $arrayData['ingredients'] = new IngredientCollection($this->ingredients);
        }else {
            $arrayData['ingredients'] = array();
        }


        if(!is_null($this->discount)) {
            $discount = $this->discount;
            $discount['fromDate'] = $this->discounted_from_date;
            $discount['toDate'] = $this->discounted_until_date;
            
            $arrayData['discount'] = new DiscountProduct($discount);
        } else {
            $arrayData['discount'] = null;
        }

        return $arrayData;
    }
}
