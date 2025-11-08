<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Candidate extends Model
{
    use HasFactory;

    protected $fillable=['status','gender','user_id','post_id', 'registration_number'];

    public function user(){
       return $this->belongsTo(User::class, 'user_id');
    }

    public function Post(){
        return $this->belongsTo(Post::class, 'post_id');
    }
    public function candidate_answers()
    {
        return $this->hasMany(CandidateAnswer::class);
    }
    public function candidate_notes()
    {
        return $this->hasMany(CandidateNote::class);
    }
}
