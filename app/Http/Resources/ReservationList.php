<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ReservationList extends JsonResource
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
			'clientName' => $this->client_name,
			'seats' => $this->seats,
			'createdAt' => $this->created_at,
			'deletedAt' => $this->deleted_at,
			'beginsAt' => $this->begins_at,
			'status' =>  ['id' => $this->status->id, 'name' => $this->status->name]
		];
	}
}
