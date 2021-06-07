<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class OrderList extends JsonResource
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
            'client' => new OrderClient($this->whenLoaded('client')),
            'name' => $this->name,
            'staff' => new Staff($this->staff),
            'phoneNumber' => $this->phone_number,
            'email' => $this->email,
            'deletedAt' => $this->deleted_at,
            'createdAt' => $this->created_at,
            'status' => [ 'id' => $this->status->id, 'name' => $this->status->name],
            'totalQuantity' => $this->totalQuantity,
            'totalValue' => $this->totalValue,
        ];
    }
}
