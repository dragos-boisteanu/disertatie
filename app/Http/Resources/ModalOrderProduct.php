<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ModalOrderProduct extends JsonResource
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
            'id'=>$this->id,
            'name' => $this->name,
            'unitPrice' => $this->base_price,
            'quantity' => null,
            'price' => $this->price,
            'stock' => $this->quantity,
        ];
    }
}
