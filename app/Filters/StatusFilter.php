<?php 

namespace App\Filters;

class StatusFilter 
{
    public function filter($builder, $value)
    {
        if($value == 1)
        {
            return $builder->whereNull('deleted_at');
        }else {
            return $builder->whereNotNull('deleted_at');
        }
    }
}