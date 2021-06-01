<?php

namespace App\Filters\Order;

class ClientFirstNameFilter
{
    public function filter($builder, $value)
    {
        return $builder->whereHas('client', function($q) use ($value) {
            $q->where('first_name', 'like', '%' . $value . '%');
        });  
    }
}
