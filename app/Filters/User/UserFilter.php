<?php


namespace App\Filters\User;

use App\Filters\IdFilter;
use App\Filters\NameFilter;
use App\Filters\AbstractFilter;
use App\Filters\User\RoleFilter;
use App\Filters\User\FirstNameFilter;

class UserFilter extends AbstractFilter
{
   protected $filters = [
      'id' => IdFilter::class,
      'firstName' => FirstNameFilter::class,
      'name' => NameFilter::class,
      'email' => EmailFilter::class,
      'roleId' => RoleFilter::class,
      'status' => StatusFilter::class,
   ];
}