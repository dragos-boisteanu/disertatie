<?php

namespace App\Filters;

class PhoneNumberFilter 
{
    public function filter($builder, $value)
    {
        return $builder->where('phone_number', 'like', '%' . $value . '%');
    }
}