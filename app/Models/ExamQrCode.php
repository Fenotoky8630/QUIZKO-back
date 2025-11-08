<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ExamQrCode extends Model
{
    use HasFactory;

    protected $fillable = [
        'candidate_id',
        'interview_id',
        'token',
        'is_used',
        'used_at',
        'status', // "valid", "expired", "used"
        'generated_at'
    ];

    protected $casts = [
        'is_used' => 'boolean',
        'used_at' => 'datetime',
        'generated_at' => 'datetime'
    ];

    /**
     * Relation : le candidat auquel ce QR code appartient
     */
    public function candidate(): BelongsTo
    {
        return $this->belongsTo(User::class, 'candidate_id');
    }

    /**
     * Relation : l’examen (ou interview) auquel ce QR est associé
     */
    public function interview(): BelongsTo
    {
        return $this->belongsTo(Interview::class, 'interview_id');
    }

}
