<?php

namespace App\Filters\Order;

class StaffFirstNameFilter
{
    public function filter($builder, $value)
    {
        return $builder->whereHas('staff', function($q) use ($value) {
            $q->where('first_name', $value);
        });  
    }
}
