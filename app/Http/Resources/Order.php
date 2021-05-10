<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Order extends JsonResource
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
            'staff' => [ 'name' => $this->staff->first_name . ' ' . $this->staff->name, 'id'=> $this->staff->id],
            'deliveryMethod' => $this->delivery_method_id,
            'phoneNumber' => $this->phone_number,
            'email' => $this->email,
            'address' => $this->address,
            'observations' => $this->observations,
            'deletedAt' => $this->deleted_at,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
            'items' => new OrderItemCollection($this->items),
            'status' => $this->status_id
        ];
    }
}
