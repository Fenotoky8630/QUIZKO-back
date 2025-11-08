<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CandidateAnswer extends Model
{
    use HasFactory;

    protected $fillable=['candidate_id','answer_id','interview_id','answer_of_candidate', 'point'];
 
    public function candidate(){
       return $this->belongsTo(Candidate::class,'candidate_id');
    }

    public function answer(){
        return $this->belongsTo(Answer::class, 'answer_id');
    }

    public function interview(){
        return $this->belongsTo(Interview::class, 'interview_id');
    }
    // public function answers()
    // {
    //     return $this->belongsToMany(Answer::class);
    // }
}
