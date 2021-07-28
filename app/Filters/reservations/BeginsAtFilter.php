<?php

namespace App\Filters\Reservations;

use Carbon\Carbon;

class BeginsAtFilter 
{
	public function filter($builder, $value)
	{
		debug($value);
		return $builder->whereDate('begins_at', '=', Carbon::createFromFormat('d-m-Y H:i', $value));
	}
}