<?php

namespace App\Policies;

use App\Models\CandidateAnswer;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class CandidateAnswerPolicy
{
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
    public function view(User $user, CandidateAnswer $CandidateAnswer): bool
    {
         return ($this->viewAny($user)||$user->id===$CandidateAnswer->candidate_id);
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->role === 'candidate' ;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, CandidateAnswer $CandidateAnswer): bool
    {
        return $user->role === 'admin' || $user->role==='recruiter';
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, CandidateAnswer $CandidateAnswer): bool
    {
        return $user->role === 'admin' || $user->role==='recruiter' ;
    }
}
