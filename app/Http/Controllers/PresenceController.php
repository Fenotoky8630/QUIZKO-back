<?php

namespace App\Http\Controllers;

use App\Models\ExamQrCode;
use App\Models\ExamPresence;
use App\Models\Interview;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Log;

class PresenceController extends Controller
{
    /**
     * ✅ Enregistre la présence
     */
    /*
    public function handleScan(Request $request)
    {
        $request->validate([
            'token'      => 'required|string',
            'id' => 'required|integer',
        ]);

        // ✅ Vérifie QR
        $qr = ExamQrCode::where('token', $request->token)->first();
        if (!$qr) {
            return response()->json(['error' => 'QR Code invalide'], 404);
        }

        // ✅ Vérifie interview
        $interview = Interview::find($qr->interview_id);
        if (!$interview) {
            return response()->json(['error' => 'Session introuvable'], 404);
        }

        // ✅ Vérifie statut
        if ($qr->status !== 'valid') {
            return response()->json(['error' => 'QR Code déjà utilisé ou expiré'], 400);
        }

        // ✅ Vérifie fenêtre de temps
        $start = Carbon::parse($interview->start_date);
        $end   = Carbon::parse($interview->end_date);

        $now = Carbon::now();
        $startWindow = $start->copy()->subMinutes(30);

        \Log::info('SCAN', [
            'now'          => $now,
            'start'        => $start,
            'end'          => $end,
            'startWindow'  => $startWindow,
        ]);

        if (!$now->between($startWindow, $end)) {
            return response()->json(['error' => 'QR Code non valide à cette heure'], 400);
        }

        // ✅ Enregistre présence
        $presence = ExamPresence::create([
            'candidate_id' => $qr->candidate_id,
            'interview_id' => $qr->interview_id,
            'scanned_at'   => $now,
            'scanned_by'   => $request->scanned_by,
            'status'       => 'present',
        ]);

        // ✅ Marque QR utilisé
        $qr->update(['status' => 'used']);

        return response()->json([
            'message'   => 'Présence enregistrée avec succès',
            'presence'  => $presence,
            'candidate' => $qr->candidate,
        ]);
    }
        */

    public function handleScan(Request $request)
{
    $request->validate([
        'token'      => 'required|string',
        'id' => 'required|integer',
    ]);



    $now   = Carbon::now();
    $now1   = Carbon::now()-> copy()->addHour(-2);

    Log::info('token', [$request->token]);
    Log::info('Date', [$now]);
    Log::info('Date', [$now1]);

        
//    $exam = Exam::where('token', $request->token)->first();


    // ✅ Vérifie QR
    $qr = ExamQrCode::where('token', $request->token)->first();
    if (!$qr) {
        return response()->json(['error' => 'QR Code invalide'], 404);
    }

    // ✅ Vérifie interview
    $interview = Interview::find($qr->interview_id);
    if (!$interview) {
        return response()->json(['error' => 'Session introuvable'], 404);
    }

    // ✅ Vérifie statut
    if ($qr->status !== 'valid') {
        return response()->json(['error' => 'QR Code déjà utilisé ou expiré'], 400);
    }

    // ✅ Vérifie fenêtre de temps - VERSION CORRIGÉE
    $start = Carbon::parse($interview->start_date);
    $end   = Carbon::parse($interview->end_date);
    
    

    $startWindow = $start->copy()->subMinutes(30);
    $endWindow = $end; // Jusqu'à la fin de l'interview

   
    // Vérification plus flexible
    if ($now->lt($startWindow) || $now->gt($endWindow)) {
        return response()->json([
            'error' => 'QR Code non valide à cette heure',
            'details' => [
                'current_time' => $now->format('Y-m-d H:i:s'),
                'valid_from' => $startWindow->format('Y-m-d H:i:s'),
                'valid_until' => $endWindow->format('Y-m-d H:i:s'),
                'time_remaining' => $now->diffInMinutes($startWindow, false) . ' minutes'
            ]
        ], 400);
    }

    // ✅ Enregistre présence
    $presence = ExamPresence::create([
        'candidate_id' => $qr->candidate_id,
        'interview_id' => $qr->interview_id,
        'scanned_at'   => $now,
        'scanned_by'   => $request->scanned_by,
        'status'       => 'present',
    ]);

    // ✅ Marque QR utilisé
    $qr->update(['status' => 'used']);

    return response()->json([
        'message'   => 'Présence enregistrée avec succès',
        'presence'  => $presence,
        'candidate' => $qr->candidate,
    ]);
}/**
 * ✅ Vue Inertia - Version corrigée
 */
public function showPresence()
{
    $presences = ExamPresence::with([
            'candidate.user', 
            'interview', 
            'scannedByUser'
        ])
        ->orderBy('scanned_at', 'desc')
        ->get()
        ->map(function ($p) {
            // Debug des relations
            logger()->info('ExamPresence Debug', [
                'presence_id' => $p->id,
                'candidate' => $p->candidate ? 'exists' : 'null',
                'candidate_user' => $p->candidate?->user ? 'exists' : 'null',
                'interview' => $p->interview ? 'exists' : 'null',
                'scannedByUser' => $p->scannedByUser ? 'exists' : 'null',
            ]);

            // Récupération sécurisée du nom du candidat
            $candidateName = 'Candidat inconnu';
            if ($p->candidate && $p->candidate->user) {
                $firstName = $p->candidate->user->first_name ?? '';
                $lastName = $p->candidate->user->last_name ?? '';
                $fullName = trim($firstName . ' ' . $lastName);
                $candidateName = $fullName ?: 'Candidat sans nom';
                
                // Ajouter le numéro d'inscription si disponible
                if ($p->candidate->registration_number) {
                    $candidateName .= " ({$p->candidate->registration_number})";
                }
            } elseif ($p->candidate) {
                $candidateName = 'Candidat #' . $p->candidate->id;
                if ($p->candidate->registration_number) {
                    $candidateName .= " ({$p->candidate->registration_number})";
                }
            }

            // Récupération sécurisée du titre de l'interview
            $interviewTitle = 'Entretien non spécifié';
            if ($p->interview) {
                $interviewTitle = $p->interview->name ?? ($p->interview->title ?? 'Entretien sans titre');
            }

            // Récupération sécurisée du nom de la personne qui a scanné
            $scannedByName = 'Système';
            if ($p->scannedByUser) {
                $scannerFirstName = $p->scannedByUser->first_name ?? '';
                $scannerLastName = $p->scannedByUser->last_name ?? '';
                $scannerFullName = trim($scannerFirstName . ' ' . $scannerLastName);
                $scannedByName = $scannerFullName ?: 'Utilisateur #' . $p->scanned_by;
            } else {
                // Si la relation ne fonctionne pas, utiliser directement scanned_by
                $scannedByName = 'Utilisateur #' . $p->scanned_by;
            }

            // Gestion sécurisée de scanned_at
            $scannedAt = $p->scanned_at;
            $scannedAtFormatted = null;
            
            if ($scannedAt) {
                if (is_string($scannedAt)) {
                    try {
                        $scannedAt = \Carbon\Carbon::parse($scannedAt);
                    } catch (\Exception $e) {
                        $scannedAt = null;
                    }
                }
                
                if ($scannedAt instanceof \Carbon\Carbon) {
                    $scannedAtFormatted = $scannedAt->format('d/m/Y H:i');
                    $scannedAt = $scannedAt->format('Y-m-d H:i:s');
                }
            }

            return [
                'id'              => $p->id,
                'candidate_name'  => $candidateName,
                'interview_title' => $interviewTitle,
                'scanned_at'      => $scannedAt,
                'scanned_at_formatted' => $scannedAtFormatted,
                'scanned_by'      => $scannedByName,
                'status'          => $p->status ?? 'unknown',
                'status_display'  => $this->getStatusDisplay($p->status),
            ];
        });

    // Statistiques pour le frontend
    $stats = [
        'total'   => $presences->count(),
        'present' => $presences->where('status', 'present')->count(),
        'absent'  => $presences->where('status', 'absent')->count(),
        'unknown' => $presences->where('status', 'unknown')->count(),
    ];

    return Inertia::render('Presence/List', [
        'presences' => $presences,
        'stats'     => $stats,
        'last_update' => now()->format('d/m/Y H:i'),
    ]);
}

/**
 * Formatage du statut pour l'affichage
 */
private function getStatusDisplay($status)
{
    return match($status) {
        'present' => 'Présent',
        'absent'  => 'Absent',
        'pending' => 'En attente',
        default   => 'Non défini'
    };
}
}
