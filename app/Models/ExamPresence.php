<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExamPresence extends Model
{
    use HasFactory;

    /**
     * Table associée
     */
    protected $table = 'exam_presences';

    /**
     * Champs remplissables en masse
     */
    protected $fillable = [
        'candidate_id',
        'interview_id',
        'scanned_at',
        'scanned_by',
        'status',
    ];

    /**
     * Indique si le modèle doit gérer automatiquement les timestamps
     */
    public $timestamps = true;

    /**
     * Relations
     */

    // 🔹 Un enregistrement de présence appartient à un candidat
    public function candidate()
    {
        return $this->belongsTo(Candidate::class);
    }

    // 🔹 Un enregistrement de présence appartient à une session d'examen
    public function examSession()
    {
        return $this->belongsTo(Interview::class);
    }

    // 🔹 L'utilisateur (agent/surveillant) qui a scanné le QR
    public function scannedByUser()
    {
        return $this->belongsTo(User::class, 'scanned_by');
    }
}
