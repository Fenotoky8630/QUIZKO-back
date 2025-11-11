<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExamPresence extends Model
{
    use HasFactory;

    protected $fillable = [
        'candidate_id',
        'interview_id',
        'scanned_at',
        'scanned_by',
        'status',
    ];

    // ✅ Relations
    public function candidate()
    {
        return $this->belongsTo(Candidate::class);
    }

    public function interview()
    {
        return $this->belongsTo(Interview::class);
    }

    public function scannedByUser()
    {
        return $this->belongsTo(User::class, 'scanned_by');
    }
}
