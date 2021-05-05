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
            'client' => ['name' => $this->client->first_name . ' ' . $this->client->name, 'id'=> $this->client->id],
            'staff' => [ 'name' => $this->staff->first_name . ' ' . $this->staff->name, 'id'=> $this->staff->id],
            'paymentMethod' => $this->paymentMethod,
            'address' => $this->address,
            'observations' => $this->observations,
            'craetedAt' => $this->createdAt,
            'updatedAt' => $this->updatedAt
        ];
    }
}
