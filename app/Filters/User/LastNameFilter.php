<?php

namespace App\Filters\User;

class LastNameFilter
{
    public function filter($builder, $value)
    {
        return $builder->where('last_name', 'like', '%'.$value.'%');
    }
}
