<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Candidate;
use Illuminate\Support\Facades\Hash;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $request->session()->regenerate();

        return redirect()->intended(RouteServiceProvider::HOME);
    }
    /** Handle an incoming authentication request in api.
    */
   public function apiStore(LoginRequest $request): JsonResponse
    {
        if($request->authenticateApi()) {
            $user = $request->user();
            $user->tokens()->delete();
            $userId =  $user->id;
            $users = Cache::get('online-users', []);
            $users[$userId] = [
              'id' => $user->id,
              'name' => $user->name,
              'email' => $user->email,
              'last_active' => now(), 
          ];
            Cache::put('online-users', $users, now()->addMinutes(60));
            $token = $user->createToken('api-token');
            $user->load('candidate.post');

            return response()->json([
                'user' => $user,
                'token' => $token->plainTextToken,
            ], 200); 
        } else {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
    }

    public function subscribeCandidate(Request $request): JsonResponse
    {
      $user = User::where('email', $request->email)->first();
      $candidate = Candidate::where('registration_number', $request->registration_number)->first();

      if($user) {
        return response()->json([
          'code' => 'duplicated email',
          'message' => 'Duplicated email'
        ], 400);
      }

      if($candidate) {
        return response()->json([
          'code' => 'duplicated registration number',
          'message' => 'Duplicated registration number'
        ], 400);
      }

      $request->validate([
        'name' => 'required|string|max:255',
        'phone' => 'required|string|max:50',
        'email' => 'required|string|lowercase|email|max:255',
        'password' => ['required'],
        'gender' => 'required',
        'post_id' => 'required'
      ]);

      $user = User::create([
          'name' => $request->name,
          'email' => $request->email,
          'phone' => $request->phone,
          'password' => Hash::make($request->password),
      ]);

      $candidate = new Candidate();
      $candidate->registration_number = $request->input('registration_number');
      $candidate->user_id = $user->id;
      $candidate->post_id = $request->input('post_id');
      $candidate->gender = $request->input('gender');
      $candidate->save();

      $user->load('candidate.post');

      return response()->json([
        'user' => $user,
        'token' => $user->createToken('api-token')->plainTextToken,
      ], 201); 

    }
    
    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
  /**
   * Destroy an authenticated session in API
   */
    public function apiDestroy(Request $request): JsonResponse
    {
        $user= $request->user();
        $user->tokens()->delete();
        $userId = $user->id;
        $users = Cache::get('online-users', []);
        unset($users[$userId]);
        Cache::put('online-users', $users, now()->addMinutes(60)); 
        return response()->json([
            'message'=>"User loged out",
           ]);
    }
    /**
     * Get list of authenticated users.
     *
     * @param  Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getAuthenticatedUsers(Request $request)
    {
        $users = collect(Cache::get('online-users', []))->values();

        return response()->json(['users' => $users]);
    }
}
