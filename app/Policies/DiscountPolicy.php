<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Discount;
use Illuminate\Auth\Access\Response;
use Illuminate\Auth\Access\HandlesAuthorization;

class DiscountPolicy
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
        if( $user->role->name === "Administrator" || $user->role->name === "Location Manager") {
            Response::allow();
        }

       Response::deny('You are not authorized to perform this action.');
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Discount  $discount
     * @return mixed
     */
    public function update(User $user)
    {
        if( $user->role->name === "Administrator" || $user->role->name === "Location Manager") {
            Response::allow();
        }

       Response::deny('You are not authorized to perform this action.');
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Discount  $discount
     * @return mixed
     */
    public function delete(User $user)
    {
        if( $user->role->name === "Administrator" || $user->role->name === "Location Manager") {
            Response::allow();
        }

       Response::deny('You are not authorized to perform this action.');
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Discount  $discount
     * @return mixed
     */
    public function restore(User $user)
    {
        if( $user->role->name === "Administrator" || $user->role->name === "Location Manager") {
            Response::allow();
        }

       Response::deny('You are not authorized to perform this action.');
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Discount  $discount
     * @return mixed
     */
    public function forceDelete(User $user)
    {
        if( $user->role->name === "Administrator") {
            Response::allow();
        }

       Response::deny('You are not authorized to perform this action.');
    }
}
