<?php

namespace App\Http\Controllers;

use App\Mail\TestMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;
use App\Models\User;
use App\Models\PasswordResetToken;
use App\Mail\ResetPasswordMail;
class PasswordResetController extends Controller
{
    public function sendResetCode(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
        ]);
        
        $code = Str::random(6);

        PasswordResetToken::updateOrCreate(
            ['email' => $request->email],
            ['token' => $code, 'created_at' => now()]
        );

        Mail::to($request->email)->send(new ResetPasswordMail($code));

        return response()->json(['message' => 'Code de réinitialisation envoyé avec succès']);
    }

    public function verifyResetCode(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
            'token' => 'required|string',
        ]);

        $passwordReset = PasswordResetToken::where('email', $request->email)
            ->where('token', $request->token)
            ->first();

        if (!$passwordReset) {
            return response()->json(['error' => 'Code de réinitialisation incorrect'], 422);
        }

        return response()->json(['message' => 'Code de réinitialisation correct']);
    }

    public function resetPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
            'token' => 'required|string',
            'new_password' => 'required|string|min:6',
        ]);
        
        $passwordReset = PasswordResetToken::where('email', $request->email)
            ->where('token', $request->token)
            ->first();

        if (!$passwordReset) {
            return response()->json(['error' => 'Code de réinitialisation incorrect'], 422);
        }

        $user = User::where('email', $request->email)->first();
        $user->password = Hash::make($request->new_password);
        $user->save();

        $passwordReset->delete();

        return response()->json(['message' => 'Mot de passe réinitialisé avec succès']);
    }

}
