<?php

namespace App\Filters\Order;

class NameFilter
{
    public function filter($builder, $value)
    {
        return $builder->whereHas('staff', function($q) use ($value) {
            $q->where('name', 'like', '%' . $value . '%');
        });  
    }
}
