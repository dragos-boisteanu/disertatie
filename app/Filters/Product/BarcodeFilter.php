<?php

namespace App\Filters\Product;

class BarcodeFilter 
{
    public function filter($builder, $value)
    {
        return $builder->where('barcode', $value);
    }
}
