<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    use HasFactory;
    
    protected $fillable=['subject'];
    
    // public function questions()
    // {
    //     return $this->belongsToMany(Question::class, 'question_subjects');
    // }
    public function interviews()
    {
        return $this->hasMany(Interview::class);
    }
    public function questionSubjects()
    {
        return $this->belongsToMany(QuestionSubject::class, 'question_subjects');
    }
    public function questions() {
        return $this->belongsToMany(Question::class, 'question_subjects', 'subject_id', 'question_id'); 
    }
}
