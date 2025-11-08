<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\ExamQrCode;
use Illuminate\Support\Str;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class ExamQrController extends Controller
{
    public function requestQr(Request $request)
    {
        $request->validate([
            'id' => 'required|integer',//identifiant candidat
            'interview_id' => 'required|integer',

        ]);

        $interview_id = $request -> interview_id;

        // 1️⃣ Vérifier si le candidat existe
        $candidate = User::find($request->id);
        if (!$candidate) {
            return response()->json(['error' => 'Matricule invalide'], 404);
        }

        // 2️⃣ Vérifier si un QR a déjà été généré pour ce candidat
        $existingQr = ExamQrCode::where('candidate_id', $candidate->id && 'interview_id', $interview_id)->first();

        if ($existingQr) {
            // ✅ Retourner le QR déjà généré
            $qrImage = QrCode::size(250)->generate(json_encode([
                'token' => $existingQr
            ]));

            return response()->json([
                'message' => 'QR déjà généré',
                'qr' => base64_encode($qrImage)
            ]);
        }

        // 3️⃣ Générer un nouveau QR code
        $token = Str::uuid()->toString();

        $newQr = ExamQrCode::create([
            'candidate_id' => $candidate->id,
            'interview_id' => $interview_id,
            'token' => $token,
            'is_used' => false,
            'generated_at' => now(),
            'status' => 'valid'
        ]);

        return response()->json([
            'message' => 'QR code généré avec succès',
            'qr' => $newQr
        ]);
    }
}
