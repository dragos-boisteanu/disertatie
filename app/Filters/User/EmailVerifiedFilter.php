<?php

namespace App\Filters\User;

class EmailVerifiedFilter
{
    public function filter($builder, $value)
    {

        if($value == '1') {
            return $builder->whereNotNull('email_verified_at');
        }

        return $builder->whereNull('email_verified_at');
    }
}
