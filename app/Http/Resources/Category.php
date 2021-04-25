<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Category extends JsonResource
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
            'name' => $this->name,
            'vat' => $this->vat,
            'color' => $this->color
        ];

        if(!is_null($this->discount)) {
            $arrayData['discount'] = new DiscountProduct($this->discount);
            $arrayData['discountStartsAt'] = $this->discounted_from_date;
            $arrayData['discountEndsAt'] = $this->discounted_until_date;
        }

        return $arrayData;
    }
}
