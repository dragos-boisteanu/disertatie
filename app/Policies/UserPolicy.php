<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\Response;
use Illuminate\Auth\Access\HandlesAuthorization;

class UserPolicy
{
	use HandlesAuthorization;

	/**
	 * Determine whether the user can create models.
	 *
	 * @param  \App\Models\User  $user
	 * @return mixed
	 */
	public function create(User $user)
	{
		if ($user->isAdminitrator() || $user->isLocationManager() || $user->isWaiter()) {
			return true;
		}

		return false;
	}


	/**
	 * Determine whether the user can update the model.
	 *
	 * @param  \App\Models\User  $user
	 * @param  \App\Models\User  $model
	 * @return mixed
	 */
	public function update(User $user)
	{
		if ($user->isAdminitrator() || $user->isLocationManager() || $user->isWaiter()) {
			return true;
		}

		return false;
	}

	/**
	 * Determine whether the user can delete the model.
	 *
	 * @param  \App\Models\User  $user
	 * @param  \App\Models\User  $model
	 * @return mixed
	 */
	public function delete(User $user)
	{
		if ($user->isAdminitrator() || $user->isLocationManager() || $user->isWaiter()) {
			return true;
		}

		return false;
	}

	/**
	 * Determine whether the user can restore the model.
	 *
	 * @param  \App\Models\User  $user
	 * @param  \App\Models\User  $model
	 * @return mixed
	 */
	public function restore(User $user)
	{
		if ($user->isAdminitrator() || $user->isLocationManager() || $user->isWaiter()) {
			return true;
		}

		return false;
	}

	/**
	 * Determine whether the user can permanently delete the model.
	 *
	 * @param  \App\Models\User  $user
	 * @param  \App\Models\User  $model
	 * @return mixed
	 */
	public function forceDelete(User $user)
	{
		if ($user->isAdminitrator()) {
			return true;
		}

		return false;
	}
}
