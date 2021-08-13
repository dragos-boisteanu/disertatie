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
			'value' => $this->value,
			'startsAt' => $this->starts_at->format('Y-m-d H:i:s'),
			'endsAt' => $this->ends_at->format('Y-m-d H:i:s'),
			'deletedAt' => $this->deleted_at,
			'createdAt' => $this->created_at,
			'productsCount' => $this->products()->count(),
			'categoriesCount' => $this->categories()->count(),
		];
	}
}
