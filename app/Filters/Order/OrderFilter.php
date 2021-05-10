<?php

namespace App\Filters\Order;

use App\Filters\AbstractFilter;

class OrderFilter extends AbstractFilter
{
    protected $filters = [
       'id' => IdFilter::class,
       'phoneNumber' => PhoneNumberFilter::class,
       'firstName' => ClientFirstName::class,
       'name' => ClientLastName::class,
       'fromDate' => FromDateFilter::class,
       'toDate' => ToDateFilter::class,
       'staffFirstName' => StaffFirstNameFilter::class,
       'staffName' => StaffNameFilter::class
    ];
}