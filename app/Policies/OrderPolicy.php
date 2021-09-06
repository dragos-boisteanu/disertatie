<?php

namespace App\Policies;

use App\Models\Order;
use App\Models\User;
use Illuminate\Auth\Access\Response;
use Illuminate\Auth\Access\HandlesAuthorization;

class OrderPolicy
{
	use HandlesAuthorization;

	/**
	 * Determine whether the user can view the model.
	 *
	 * @param  \App\Models\User  $user
	 * @param  \App\Models\Order  $order
	 * @return mixed
	 */
	public function view(User $user, Order $order)
	{
		if (($user->isClient() && $order->client_id === $user->id) || !$user->isClient()) {
			return true;
		}

		return false;
	}

	/**
	 * Determine whether the user can create models.
	 *
	 * @param  \App\Models\User  $user
	 * @return mixed
	 */
	public function create(User $user)
	{
		if ($user->isWaiter() || $user->isAdminitrator() || $user->isLocationManager()) {
			return true;
		}

		return false;
	}

	/**
	 * Determine whether the user can update the model.
	 *
	 * @param  \App\Models\User  $user
	 * @param  \App\Models\Order  $order
	 * @return mixed
	 */
	public function update(User $user, Order $order)
	{
		if (($user->isWaiter() && $order->staff_id === $user->id) || $user->isAdminitrator() || $user->isLocationManager()) {
			return true;
		}

		return false;
	}

	public function updateStatus(User $user, Order $order)
	{
		if (($user->isWaiter() && $order->staff_id === $user->id)
			|| ($user->isDelivery())
			|| $user->isKitchenManager()
			|| $user->isAdminitrator()
			|| $user->isLocationManager()
		) {
			return true;
		}

		return false;
	}

	public function	updateItems(User $user, Order $order)
	{
		if (($user->isWaiter() && $order->staff_id === $user->id) || $user->isAdminitrator() || $user->isLocationManager()) {
			return true;
		}

		return false;
	}

	/**
	 * Determine whether the user can delete the model.
	 *
	 * @param  \App\Models\User  $user
	 * @param  \App\Models\Order  $order
	 * @return mixed
	 */
	public function disable(User $user, Order $order)
	{
		if (($user->isWaiter() && $order->staff_id === $user->id) || $user->isAdminitrator() || $user->isLocationManager()) {
			return true;
		}

		return false;
	}
}
