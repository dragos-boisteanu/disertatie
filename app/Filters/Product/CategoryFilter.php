<?php


namespace App\Filters\Product;

class CategoryFilter 
{
    public function filter($builder, $value)
    {
        if(is_array($value)) {
            return $builder->whereIn('category_id', $value);
        }
        
        return $builder->where('category_id', $value);
    }
}