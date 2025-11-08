<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Interview extends Model
{
    use HasFactory;

    protected $fillable=['id','name','start_date','end_date','time','isExpired', 'post_id', 'subject_id','is_active'];

    public function post(){
        return $this->belongsTo(Post::class, 'post_id');
    }
    public function subject()
    {
        return $this->belongsTo(Subject::class, 'subject_id');
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
