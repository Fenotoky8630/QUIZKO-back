<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $fillable=['name', 'description', 'is_available', 'nb_allowed'];

    public function candidates(){
        return $this->hasMany(Candidate::class);
     }
}
