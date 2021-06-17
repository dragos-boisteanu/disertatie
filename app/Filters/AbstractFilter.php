<?php 

namespace App\Filters;

use Illuminate\Support\Arr;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;


abstract class AbstractFilter 
{
    protected $data;
    protected $filters = [];

    public function __construct(array $data) 
    {
        $this->data = $data;
   }

    public function filter(Builder $builder)
    {
        foreach($this->getFilters() as $filter => $value)
        {
            $this->resolveFilters($filter)->filter($builder, $value);
        }

        return $builder;
    }

    public function getFilters()
    {
        return array_filter(Arr::only($this->data, array_keys($this->filters)));
    }

    public function resolveFilters($filter)
    {
        return new $this->filters[$filter];
    }
}