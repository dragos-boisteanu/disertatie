<?php

namespace App\Filters\Product;

class PriceEndFilter 
{
    public function filter($builder, $value)
    {
        return $builder->where('base_price', '<=', $value);
    }
}