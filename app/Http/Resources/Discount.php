<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Discount extends JsonResource
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
            'code' => $this->code,
            'percent' => $this->percent,
            'startsAt' => $this->starts_at,
            'endsAt' => $this->ends_at,
            'createdBy' => $this->user_id,
            'deletedAt' => $this->deleted_at,
            'createdAt' => $this->created_at,
            'products' => new DiscountProductCollection($this->whenLoaded('products')),
            'categories' => new DiscountCategoryCollection($this->whenLoaded('categories')),
        ];
    }
}
