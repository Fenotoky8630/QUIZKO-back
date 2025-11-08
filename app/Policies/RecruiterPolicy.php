<?php

namespace App\Policies;

use App\Models\User;

class RecruiterPolicy
{
    /**
     * Create a new policy instance.
     */
    public function __construct()
    {
        //
    }
     /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->role === 'admin' || $user->role==='recruiter' ;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, User $broker): bool
    {
        //
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->role === 'admin';
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, User $broker): bool
    {
        //
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user): bool
    {
        return $user->role === 'admin';
    }
}
