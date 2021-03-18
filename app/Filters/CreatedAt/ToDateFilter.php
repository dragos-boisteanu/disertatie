<?php

namespace App\Filters\CreatedAt;

class ToDateFilter 
{
    public function filter($builder, $value)
    {
        return $builder->whereDate('created_at', '<=', $value);
    }
}