<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Ingredient extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'stockQuantity' => $this->stock->quantity, 
            'quantity' => $this->whenPivotLoaded('ingredient_product', function () {
                return $this->pivot->quantity;
            }, ''),
            'productsCount' => $this->products()->count(),
            'unit' => $this->unit,
        ];
    }
}
