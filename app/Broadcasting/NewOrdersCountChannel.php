<?php

namespace App\Broadcasting;

use App\Models\User;

class NewOrdersCountChannel
{
	/**
	 * Create a new channel instance.
	 *
	 * @return void
	 */
	public function __construct()
	{
		//
	}

	/**
	 * Authenticate the user's access to the channel.
	 *
	 * @param  \App\Models\User  $user
	 * @return array|bool
	 */
	public function join(User $user)
	{
		if ($user->role->name !== 'Client') {
			return true;
		}

		return false;
	}
}
