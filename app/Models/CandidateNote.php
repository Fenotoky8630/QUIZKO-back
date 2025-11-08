<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CandidateNote extends Model
{
    use HasFactory;
    protected $fillable=['note','interim_note','candidate_id','interview_id'];
 
    public function candidate(){
       return $this->belongsTo(Candidate::class,'candidate_id');
    }

    public function interview(){
        return $this->belongsTo(Interview::class, 'interview_id');
    }
}
