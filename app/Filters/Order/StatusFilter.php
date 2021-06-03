<?php

namespace App\Filters\Order;

class StatusFilter
{
  public function filter($builder, $value)
  {
    if(is_array($value)) {
      return $builder->whereIn('status_id', $value);
    }
    
    return $builder->where('status_id', $value);
  }
}
