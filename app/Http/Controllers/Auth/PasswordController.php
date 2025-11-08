<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class PasswordController extends Controller
{
    /**
     * Update the user's password.
     */
    public function update(Request $request)
    {
        $validated = $request->validate([
            'current_password' => ['required'],
            'password' => ['required', Password::defaults(), 'confirmed'],
        ]);

        $user = $request->user();

        
        if (!Hash::check($validated['current_password'], $user->password)) {
            $errorMessage = 'The current password is incorrect.';
            if ($user->role === 'candidate') {
                return response()->json([
                    'status' => 'error',
                    'message' =>$errorMessage
                ], 422);
            } else {
                return back()->with(['status' => $errorMessage]);
            }
        }

        $user->update([
            'password' => Hash::make($validated['password']),
        ]);

        if ($user->role === 'candidate') {
            return response()->json([
                'status' => 'success',
                'message' => 'Password updated successfully'
            ]);
        }

        return back()->with('status', 'Password updated successfully');
    }
}
