<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
use Illuminate\Http\Request;
use App\Models\ExamQrCode;
use Illuminate\Support\Str;

class ExamQrController extends Controller
{
    /**
     * ✅ Génère un QR ou retourne l’existant
     */
    public function requestQr(Request $request)
    {
        $request->validate([
            'candidate_id'           => 'required|integer',   // Candidate ID
            'interview_id'=> 'required|integer',
        ]);

        $candidate = Candidate::find($request->candidate_id);
        if (!$candidate) {
            return response()->json(['error' => 'Matricule invalide'], 404);
        }

        // ✅ Vérifie si déjà généré
        $existingQr = ExamQrCode::where('candidate_id', $candidate->id)
            ->where('interview_id', $request->interview_id)
            ->first();

        if ($existingQr) {
            return response()->json([
                'message' => 'QR déjà généré',
                'qr'      => $existingQr
            ]);
        }

        // ✅ Sinon créer
        $token = Str::uuid();

        $newQr = ExamQrCode::create([
            'candidate_id' => $candidate->id,
            'interview_id' => $request->interview_id,
            'token'        => $token,
            'status'       => 'valid',
            'generated_at' => now(),
        ]);

        return response()->json([
            'message' => 'QR généré',
            'qr'      => $newQr
        ]);
    }
}
