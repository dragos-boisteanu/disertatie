<?php

namespace App\Filters\User;

class BarcodeFilter 
{
    public function filter($builder, $value)
    {
        return $builder->where('barcode', $value);
    }
}
