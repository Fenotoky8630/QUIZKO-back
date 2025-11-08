<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuestionSubject extends Model
{
    use HasFactory;
    
    protected $fillable=[];
    
    public function questions()
    {
        return $this->hasMany(Question::class);
    }
    public function subjects()
    {
        return $this->hasMany(Subject::class);
    }
}
