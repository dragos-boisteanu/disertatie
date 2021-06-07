<?php

namespace App\Filters\Order;

class StaffLastNameFilter
{
    public function filter($builder, $value)
    {
        return $builder->whereHas('staff', function($q) use ($value) {
            $q->where('last_name', $value);
        });  
    }
}
