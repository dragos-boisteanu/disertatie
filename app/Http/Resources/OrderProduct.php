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
        $unitPrice = $this->getOrderProductFinalPrice($this->pivot->base_unit_price, $this->pivot->discount, $this->pivot->vat);
        return [
            'id'=>$this->id,
            'name' => $this->pivot->product_name,
            'unitPrice' => $unitPrice,
            // 'vat' => $this->pivot->vat,
            // 'discount' => $this->pivot->discount,
            'quantity' => $this->pivot->quantity,
            'totalPrice' => number_format($unitPrice* $this->pivot->quantity, 2, '.', ''),
        ];
    }
}
