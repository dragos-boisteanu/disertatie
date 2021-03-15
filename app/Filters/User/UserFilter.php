<?php


namespace App\Filters\User;

use App\Filters\IdFilter;
use App\Filters\NameFilter;
use App\Filters\AbstractFilter;
use App\Filters\User\RolesFilter;
use App\Filters\User\FirstNameFilter;

class UserFilter extends AbstractFilter
{
   protected $filters = [
      'id' => IdFilter::class,
      'firstName' => FirstNameFilter::class,
      'name' => NameFilter::class,
      'email' => EmailFilter::class,
      'roles' => RolesFilter::class,
      'status' => StatusFilter::class,
   ];
}