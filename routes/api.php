<?php

use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CandidateAnswerController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\CandidateNoteController;
use App\Http\Controllers\InterviewController;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PasswordResetController;
use App\Http\Controllers\TokenController;
use App\Http\Controllers\ExamQrController;
use App\Http\Controllers\PresenceController;
use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// No Authentication needs routes
Route::post('/subscribe', [AuthenticatedSessionController::class, 'subscribeCandidate'])->name('subscribe_candidate');

Route::post('/send-reset-code', [PasswordResetController::class, 'sendResetCode']);//email

Route::post('/verify-reset-code', [PasswordResetController::class, 'verifyResetCode']);//email, token

Route::post('/new-password', [PasswordResetController::class, 'resetPassword']);//email, token , new_password

Route::get('/levels', [PostController::class, 'index'])->name('levels.index');

Route::post('/candidate/generate-qr', [ExamQrController::class, 'requestQr']);

Route::post('/recruiter/scan-qr', [PresenceController::class, 'handleScan']);


Route::middleware('auth:sanctum')->group(function() {

    Route::get('/user', function (Request $request) {
        $user=$request->user();
        $user->load('candidate.post');
        return $user;
    })->name('user.informations');

    Route::get('/student-answers/{candidate_id}/{interview_id}', [CandidateAnswerController::class, 'candidateInterviewAnswers'])->name('student_answers.studentTestAnswers');

    Route::get('/is-student-passed/{interview_id}/{candidate_id}', [CandidateNoteController::class, 'checkCandidateNotes'])->name('student_note.checkCandidateNotes');

    Route::get('tests/{post_id}', [InterviewController::class, 'getPostInterview'])->name('tests.getPostTest');

    Route::get('/is-expired/{interview_id}', [InterviewController::class, 'checkInterviewExpiration'])->name('tests.checkInterviewExpiration');

    Route::get('questions/{id}', [SubjectController::class, 'getQuestionsSubject'])->name('subjects.getQuestionsSubject');

    Route::post('/answer', [CandidateAnswerController::class, 'store'])->name('student_answers.store');

    Route::post('/logout', [AuthenticatedSessionController::class, 'apiDestroy']) ->name('logout');

    Route::put('/profile', [ProfileController::class, 'update'])->name('profile.update');//   name: "John Doe", email: "john.doe@example.com", registration_number: "123456789", gender: "male",post_id: 1

    Route::put('/password', [PasswordController::class, 'update'])->name('password.update'); //  current_password: "oldpassword123", password: "newpassword123", password_confirmation: "newpassword123"

    Route::get('/check-token', [TokenController::class, 'checkToken'])->name('check-token');

});
