<?php

namespace App\Filters\Product;

class PriceStartFilter 
{
    public function filter($builder, $value)
    {
        return $builder->where('base_price', '>=', $value);
    }
}