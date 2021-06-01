<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class OrderProduct extends JsonResource
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
            'name' => $this->pivot->product_name,
            'unitPrice' => $this->price,
            'vat' => $this->category->vat,
            'discount' => $this->finalDiscount,
            'quantity' => $this->pivot->quantity,
            'totalPrice' => number_format($this->pivot->unit_price * $this->pivot->quantity, 2, '.', ''),
        ];
    }
}
