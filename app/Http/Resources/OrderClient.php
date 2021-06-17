<?php

namespace App\Http\Resources;

use App\Http\Resources\ClientAddress;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderClient extends JsonResource
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
            'name' => $this->first_name . ' ' . $this->name,
            'id' => $this->id
        ];
    }
}
