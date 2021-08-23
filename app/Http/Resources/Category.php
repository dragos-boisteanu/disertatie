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
			'image' => $this->image,
			'name' => $this->name,
			'vat' => $this->vat,
			'color' => $this->color,

			'parentId' => $this->parent_id,
			'subCategories' => $this->whenLoaded('subCategories', new CategoryCollection($this->subCategories)),

			'position' => $this->position,
			'deletedAt' => $this->deleted_at,

			'productsCount' =>  $this->productsCount
		];

		if (!is_null($this->discount)) {
			$arrayData['discountId'] = $this->discount->id;
		} else {
			$arrayData['discountId'] = null;
		}

		if (!is_null($this->parentCategory)) {
			$arrayData['parentName'] = $this->parentCategory->name;
		} else {
			$arrayData['parentName'] = "";
		}



		debug($arrayData['productsCount']);

		return $arrayData;
	}
}
