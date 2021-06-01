<?php


namespace App\Filters\User;

use App\Filters\IdFilter;
use App\Filters\NameFilter;
use App\Filters\EmailFilter;
use App\Filters\AbstractFilter;
use App\Filters\User\RolesFilter;
use App\Filters\PhoneNumberFilter;
use App\Filters\User\FirstNameFilter;
use App\Filters\CreatedAt\ToDateFilter;
use App\Filters\CreatedAt\FromDateFilter;

class UserFilter extends AbstractFilter
{
   protected $filters = [
      'id' => IdFilter::class,
      'firstName' => FirstNameFilter::class,
      'lastName' => LastNameFilter::class,
      'email' => EmailFilter::class,
      'phoneNumber' => PhoneNumberFilter::class,
      'roles' => RolesFilter::class,
      'fromDate' => FromDateFilter::class,
      'toDate' => ToDateFilter::class,
      'verified' => EmailVerifiedFilter::class,
   ];
}