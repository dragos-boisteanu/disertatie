<?php

namespace App\Policies;

use App\Models\Reservation;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ReservationPolicy
{
	use HandlesAuthorization;

	public function view(User $user, Reservation $reservation)
	{
		if (($user->isClient() && $user->id === $reservation->user_id) || !$user->isClient()) {
			return true;
		}

		return false;
	}

	/**
	 * Determine whether the user can create models.
	 *
	 * @param  \App\Models\User  $user
	 * @return \Illuminate\Auth\Access\Response|bool
	 */
	public function create(User $user)
	{
		if ($user->isAdminitrator() || $user->isLocationManager() || $user->isWaiter() || $user->isClient()) {
			return true;
		}

		return false;
	}

	/**
	 * Determine whether the user can update the model.
	 *
	 * @param  \App\Models\User  $user
	 * @param  \App\Models\Reservation  $reservation
	 * @return \Illuminate\Auth\Access\Response|bool
	 */
	public function update(User $user, Reservation $reservation)
	{
		if ($user->isAdminitrator() || $user->isLocationManager() || $user->isWaiter() || ($user->isUser() && $user->id === $reservation->user_id)) {
			return true;
		}

		return false;
	}

	/**
	 * Determine whether the user can delete the model.
	 *
	 * @param  \App\Models\User  $user
	 * @param  \App\Models\Reservation  $reservation
	 * @return \Illuminate\Auth\Access\Response|bool
	 */
	public function delete(User $user, Reservation $reservation)
	{
		if ($user->isAdminitrator() || $user->isLocationManager() || $user->isWaiter() || ($user->isUser() && $user->id === $reservation->user_id)) {
			return true;
		}

		return false;
	}

	/**
	 * Determine whether the user can permanently delete the model.
	 *
	 * @param  \App\Models\User  $user
	 * @param  \App\Models\Reservation  $reservation
	 * @return \Illuminate\Auth\Access\Response|bool
	 */
	public function forceDelete(User $user, Reservation $reservation)
	{
		if ($user->isAdminitrator() || $user->isLocationManager() || $user->isWaiter() || ($user->isUser() && $user->id === $reservation->user_id)) {
			return true;
		}

		return false;
	}
}
