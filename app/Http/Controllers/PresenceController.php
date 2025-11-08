<?php

namespace App\Http\Controllers;

use App\Models\ExamQrCode;
use App\Models\ExamPresence;
use App\Models\Interview;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class PresenceController extends Controller
{
    /**
     * Gère la requête de validation de présence du QR Code.
     */
    public function handleScan(Request $request)
    {
        $request->validate([
            'token' => 'required|string',//token de QR code
            'scanned_by' => 'required|integer'
        ]);

        $qr = ExamQrCode::where('token', $request->token)->first();

        $interview = Interview::where('id', $qr -> interview_id)->first();

        if (!$qr) {
            return response()->json(['error' => 'QR Code invalide'], 404);
        }

        if ($qr->status !== 'valid') {
            return response()->json(['error' => 'QR Code déjà utilisé ou expiré'], 400);
        }

        // Vérifie la session d’examen

        $start = Carbon::parse($interview->start_date);
        $end = Carbon::parse($interview->end_date);

        $now = Carbon::now()->copy()->addHours(3);

        // On définit 30 minutes avant le début
        $startWindow = $start->copy()->subMinutes(30);

        if ($now->between($startWindow, $end, true)) {
        // $now est entre 30 minutes avant le début et la fin
           ExamPresence::create([
            'candidate_id' => $qr->candidate_id,
            'interview_id' => $qr->interview_id,
            'scanned_at' => $now,
            'scanned_by' => $request->scanned_by,
            'status' => 'present'
        ]);
        } else {
            return response()->json(['error' => 'QR Code non valide à cette heure'], 400);
        }

        // Enregistre la présence


        $qr->update(['status' => 'used']);

        return response()->json([
            'message' => 'Présence enregistrée avec succès',
            'candidate' => $qr->candidate
        ]);
    }
}
