<?php

namespace App\Filters\Reservations;

class EndsAtFilter 
{
	public function filter($builder, $value)
	{
		return $builder->whereDate('ends_at', '<=', $value);
	}
}