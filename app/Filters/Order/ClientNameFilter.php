<?php

namespace App\Filters\Order;

class ClientNameFilter
{
    public function filter($builder, $value)
    {
        return $builder->whereHas('client', function($q) use ($value) {
            $q->where('name', 'like', '%' . $value . '%');
        });  
    }
}
