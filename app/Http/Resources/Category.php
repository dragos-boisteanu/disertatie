<?php

namespace App\Http\Resources;

use App\Http\Resources\DiscountCategory;
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
            'color' => $this->color,
            'productsCount' => $this->products()->count()
        ];

        if(!is_null($this->discount)) {
            $discount = $this->discount;
            $discount['fromDate'] = $this->discounted_from_date;
            $discount['toDate'] = $this->discounted_until_date;
            
            $arrayData['discount'] = new DiscountCategory($discount);
        }else {
            $arrayData['discount'] = null;
        }

        return $arrayData;
    }
}
