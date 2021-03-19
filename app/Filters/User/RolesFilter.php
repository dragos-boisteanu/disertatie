<?php

namespace App\Filters\User;
class RolesFilter 
{
    public function filter($builder, $value)
    {
        if(is_array($value)) {
            return $builder->whereIn('role_id', $value);
        }
        return $builder->where('role_id', $value);
       
    }
}
