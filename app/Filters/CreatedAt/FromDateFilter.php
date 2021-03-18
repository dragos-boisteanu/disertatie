<?php

namespace App\Filters\CreatedAt;

class FromDateFilter 
{
    public function filter($builder, $value)
    {
        return $builder->whereDate('created_at', '>=', $value);
    }
}