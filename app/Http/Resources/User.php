<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class User extends JsonResource
{
	public $preserveKeys = true;
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
			'image' => $this->avatar,
			'firstName' => $this->first_name,
			'lastName' => $this->last_name,
			'email' => $this->email,
			'phoneNumber' => $this->phone_number,
			'deletedAt' => $this->deleted_at,
			'createdAt' => $this->created_at,
			'role' => ['id' => $this->role->id, 'name' => $this->role->name],
			'isAdmin' => $this->isAdminitrator(),
			'isLocaltionManager' => $this->isLocationManager(),
			'isKitchenManager' => $this->isKitchenManager(),
			'isWaiter' => $this->isWaiter(),
			'isKitchen' => $this->isKitchen(),
			'isDelivery' => $this->isDelivery(),
		];
	}
}
