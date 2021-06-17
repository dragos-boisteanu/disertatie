<?php

namespace App\Filters\Product;

class SubCategoryFilter
{
  public function filter($builder, $value)
  {
    if (is_array($value)) {
      return $builder->whereIn('sub_category_id', $value);
    }

    return $builder->where('sub_category_id', $value);
  }
}
