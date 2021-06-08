<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TableResource extends JsonResource
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
            'name' => $this->name,
            'status' => $this->whenLoaded('status', ['id'=>$this->status->id, 'name'=>$this->status->name]),
            // 'orderId' => $this->whenLoaded('order', $this->order->id),
        ];
    }
}
