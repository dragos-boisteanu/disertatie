<?php

namespace App\Filters\User;
class RolesFilter 
{
    public function filter($builder, $values)
    {
        return $builder->whereIn('role_id', $values);
    }
}
