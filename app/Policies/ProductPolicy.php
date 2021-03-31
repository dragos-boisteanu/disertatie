<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Product;
use Illuminate\Auth\Access\Response;
use Illuminate\Auth\Access\HandlesAuthorization;

class ProductPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function viewAny(User $user)
    {
        //
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Product  $product
     * @return mixed
     */
    public function view(User $user, Product $product)
    {
        //
    }

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
     * @param  \App\Models\Product  $product
     * @return mixed
     */
    public function update(User $user, Product $product)
    {
        if( $user->role_id === 6 || $user->role_id === 5) {
            Response::allow();
        }

       Response::deny('You are not authorized to perform this action.');
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Product  $product
     * @return mixed
     */
    public function delete(User $user, Product $product)
    {
        if( $user->role_id === 6 || $user->role_id === 7) {
            Response::allow();
        }

       Response::deny('You are not authorized to perform this action.');
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Product  $product
     * @return mixed
     */
    public function restore(User $user, Product $product)
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
     * @param  \App\Models\Product  $product
     * @return mixed
     */
    public function forceDelete(User $user, Product $product)
    {
        if( $user->role_id === 7 && $user->id != $product->id) {
            Response::allow();
        }

       Response::deny('You are not authorized to perform this action.');
    }
}
