<?php


namespace App\Filters\User;

use App\Filters\AbstractFilter;
use App\Filters\User\RoleFilter;
use App\Filters\IdFilter;
use App\Filters\NameFilter;

class UserFilter extends AbstractFilter
{
   protected $filters = [
      'id' => IdFilter::class,
      'name' => NameFilter::class,
      'email' => EmailFilter::class,
      'role_id' => RoleFilter::class,
      'status' => StatusFilter::class,
   ];
}