<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TokenController extends Controller
{
    /**
     * Verify if the token is still valid.
     */
    public function checkToken(Request $request)
    {
        if (Auth::check()) {
            return response()->json(['message' => 'Token is valid'], 200);
        }

        return response()->json(['message' => 'Token is invalid'], 401);
    }
}
