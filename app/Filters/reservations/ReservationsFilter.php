<?php

namespace App\Filters\Reservations;

use App\Filters\IdFilter;
use App\Filters\EmailFilter;
use App\Filters\AbstractFilter;
use App\Filters\PhoneNumberFilter;
use App\Filters\CreatedAt\ToDateFilter;
use App\Filters\CreatedAt\FromDateFilter;
use App\Filters\Reservations\EndsAtFilter;
use App\Filters\Reservations\BeginsAtFilter;

class ReservationsFilter extends AbstractFilter 
{
	
	protected $filters = [
		'id' => IdFilter::class,
		'phoneNumber' => PhoneNumberFilter::class,
		'email' => EmailFilter::class,
		'beginsAt' => BeginsAtFilter::class,
	];
}