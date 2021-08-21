<?php

namespace App\Filters\Product;

class SubCategoryFilter
{
	public function filter($builder, $value)
	{
		return $builder->whereIn('sub_category_id', $value);
	}
}
