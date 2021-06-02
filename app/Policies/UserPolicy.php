<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\Response;
use Illuminate\Auth\Access\HandlesAuthorization;

class UserPolicy
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
        Response::allow();
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\User  $model
     * @return mixed
     */
    public function view(User $user, User $model)
    {
        Response::allow();
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        if( $user->role->name === "Administrator" || $user->name === "Location Manager") {
            Response::allow();
        }

        Response::deny('You are not authorized to perform this action.');
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\User  $model
     * @return mixed
     */
    public function update(User $user, User $model)
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
     * @param  \App\Models\User  $model
     * @return mixed
     */
    public function delete(User $user, User $model)
    {
        if( ( $user->role->name === "Administrator" || $user->role->name === "Location Manager") && $user->id != $model->id && $model->role->level < $user->role->level) {
            Response::allow();
        }

        Response::deny('You are not authorized to perform this action.');
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\User  $model
     * @return mixed
     */
    public function restore(User $user, User $model)
    {
        if( ($user->role->name === "Administrator" || $user->role->name === "Location Manager") && $user->id != $model->id && $model->role->level < $user->role->level) {
            Response::allow();
        }

        Response::deny('You are not authorized to perform this action.');
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\User  $model
     * @return mixed
     */
    public function forceDelete(User $user, User $model)
    {
        if( ($user->role->name === "Administrator" || $user->role->name === "Location Manager") || ($user->role->name === "Client" && $model->id === $user->id)) {
            Response::allow();
        }

        Response::deny('You are not authorized to perform this action.');
    }
}
