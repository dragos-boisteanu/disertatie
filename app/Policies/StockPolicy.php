<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Stock;
use Illuminate\Auth\Access\Response;
use Illuminate\Auth\Access\HandlesAuthorization;

class StockPolicy
{
	use HandlesAuthorization;

	/**
	 * Determine whether the user can update the model.
	 *
	 * @param  \App\Models\User  $user
	 * @param  \App\Models\Stock  $stock
	 * @return mixed
	 */
	public function update(User $user)
	{
		if ($user->isAdminitrator() || $user->isLocationManager() || $user->isWaiter()) {
			return true;
		}

		return false;
	}
}
