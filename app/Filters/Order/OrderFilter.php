<?php

namespace App\Filters\Order;

use App\Filters\IdFilter;
use App\Filters\AbstractFilter;
use App\Filters\PhoneNumberFilter;
use App\Filters\Order\StaffNameFilter;
use App\Filters\CreatedAt\ToDateFilter;
use App\Filters\Order\ClientNameFilter;
use App\Filters\CreatedAt\FromDateFilter;
use App\Filters\Order\StaffFirstNameFilter;
use App\Filters\Order\ClientFirstNameFilter;

class OrderFilter extends AbstractFilter
{
    protected $filters = [
       'id' => IdFilter::class,
       'phoneNumber' => PhoneNumberFilter::class,
       'clientFirstName' => ClientFirstNameFilter::class,
       'clientName' => ClientNameFilter::class,
       'fromDate' => FromDateFilter::class,
       'toDate' => ToDateFilter::class,
       'staffFirstName' => StaffFirstNameFilter::class,
       'staffLastName' => StaffLastNameFilter::class,
       'statuses' => StatusFilter::class,
    ];
}