<?php

namespace App\Filters\Stock;

use Illuminate\Database\Eloquent\Builder;

class QuantityStartFilter 
{
    public function filter($builder, $value)
    {
        return $builder->join('stocks', 'stocks.id', '=', 'products.stock_id')->where('stocks.quantity', '>=', $value);
    }
}