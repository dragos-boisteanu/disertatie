<?php

namespace App\Http\Resources;

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
        return [
            'id' => $this->id,
            'name' => $this->name,
            'barcode' => $this->barcode,
            'description' => $this->description,
            'unit_price' => $this->unit_price,
            'vat' => $this->vat,
            'weight' => $this->weight,
            'unit_id' => $this->unit_id,
            'category_id' => $this->category_id,
            'quantity' => $this->stock->quantity,
        ];
    }
}
