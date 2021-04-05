<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Ingredient;
use Illuminate\Auth\Access\Response;
use Illuminate\Auth\Access\HandlesAuthorization;

class IngredientPolicy
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
        if( $user->role_id === 6 || $user->role_id === 7) {
            Response::allow();
        }

       Response::deny('You are not authorized to perform this action.');
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Ingredient  $ingredient
     * @return mixed
     */
    public function update(User $user)
    {
        if( $user->role_id === 6 || $user->role_id === 7) {
            Response::allow();
        }

       Response::deny('You are not authorized to perform this action.');
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Ingredient  $ingredient
     * @return mixed
     */
    public function forceDelete(User $user)
    {
        if( $user->role_id === 6 || $user->role_id === 7) {
            Response::allow();
        }

       Response::deny('You are not authorized to perform this action.');
    }
}
