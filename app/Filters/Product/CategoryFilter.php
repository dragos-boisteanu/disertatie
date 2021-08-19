<?php


namespace App\Filters\Product;

class CategoryFilter
{
	public function filter($builder, $value)
	{
		return $builder->whereIn('category_id', $value);
	}
}
