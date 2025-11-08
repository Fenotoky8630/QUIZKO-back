<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\CandidateController;
use App\Http\Controllers\CandidateAnswerController;
use App\Http\Controllers\CandidateNoteController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\InterviewController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\RecruiterController;
use App\Http\Controllers\ResultController;
use App\Http\Controllers\SubjectController;
use App\Models\Candidate;
use App\Models\CandidateAnswer;
use App\Models\Interview;
use App\Models\Subject;
use App\Models\Question;
use App\Models\Recruiter;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/', function () {
    return redirect(route('dashboard'));
})->middleware(['auth', 'verified']);


Route::get('/authenticated-users', [AuthenticatedSessionController::class, 'getAuthenticatedUsers']);

Route::get('/dashboard', function () {
     $candidate_count = Candidate::count();
     $question_count = Question::count();
     $subject_count = Subject::count();
     $interview_count = Interview::count();
    return Inertia::render('Dashboard',[
        'count'=>[
            "candidates"=>$candidate_count,
            "questions"=>$question_count,
            "subjects"=>$subject_count,
            "interviews"=>$interview_count,
        ],
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('auth')->prefix('departments')->group(function () {
    Route::get('/{id}', [DepartmentController::class, 'show'])->can('viewAny', Recruiter::class)->name('departments.show');
    Route::get('/', [DepartmentController::class, 'index'])->can('viewAny', Recruiter::class)->name('departments.index');
    Route::post('/', [DepartmentController::class, 'store'])->can('create', Recruiter::class)->name('departments.store');
    Route::put('/{id}', [DepartmentController::class, 'update'])->can('create', Recruiter::class)->name('departments.update');
    Route::delete('/{id}', [DepartmentController::class, 'destroy'])->can('create', Recruiter::class)->name('departments.destroy');
});

Route::middleware('auth')->prefix('professors')->group(function () {
    Route::get('/{id}', [RecruiterController::class, 'show'])->can('viewAny', Recruiter::class)->name('professors.show');
    Route::get('/', [RecruiterController::class, 'index'])->can('viewAny', Recruiter::class)->name('professors.index');
    Route::post('/', [RecruiterController::class, 'store'])->can('create', Recruiter::class)->name('professors.store');
    Route::put('/{id}', [RecruiterController::class, 'update'])->can('create', Recruiter::class)->name('professors.update');
    Route::delete('/{id}', [RecruiterController::class, 'destroy'])->can('create', Recruiter::class)->name('professors.destroy');
});

Route::middleware('auth')->prefix('levels')->group(function () {
    Route::get('/{id}', [PostController::class, 'show'])->can('viewAny', Candidate::class)->name('levels.show');
    Route::get('/', [PostController::class, 'index'])->can('viewAny', Candidate::class)->name('levels.index');
    Route::post('/', [PostController::class, 'store'])->can('create', Candidate::class)->name('levels.store');
    Route::put('/{id}', [PostController::class, 'update'])->can('create', Candidate::class)->name('levels.update');
    Route::delete('/{id}', [PostController::class, 'destroy'])->can('create', Candidate::class)->name('levels.destroy');
});

Route::middleware('auth')->prefix('students')->group(function () {
    Route::get('/{id}', [CandidateController::class, 'show'])->can('viewAny', Candidate::class)->name('students.show');
    Route::get('/', [CandidateController::class, 'index'])->can('viewAny', Candidate::class)->name('students.index');
    Route::post('/import', [CandidateController::class, 'importExcelData'])->can('create', Candidate::class)->name('students.importExcelData');
    Route::post('/', [CandidateController::class, 'store'])->can('create', Candidate::class)->name('students.store');
    Route::put('/{id}', [CandidateController::class, 'update'])->can('create', Candidate::class)->name('students.update');
    Route::delete('/{id}', [CandidateController::class, 'destroy'])->can('create', Candidate::class)->name('students.destroy');
});

Route::middleware('auth')->prefix('questions')->group(function () {
    Route::get('/{id}', [QuestionController::class, 'show'])->can('viewAny', Question::class)->name('questions.show');
    Route::get('/', [QuestionController::class, 'index'])->can('viewAny', Question::class)->name('questions.index');
    Route::post('/', [QuestionController::class, 'store'])->can('create', Question::class)->name('questions.store');
    Route::put('/{id}', [QuestionController::class, 'update'])->can('create', Question::class)->name('questions.update');
    Route::delete('/{id}', [QuestionController::class, 'destroy'])->can('create', Question::class)->name('questions.destroy');
});

Route::middleware('auth')->prefix('subjects')->group(function () {
    Route::get('/create', [SubjectController::class, 'create'])->can('viewAny', Question::class)->name('subjects.create');
    Route::get('/edit/{id}', [SubjectController::class, 'edit'])->can('viewAny', Question::class)->name('subjects.edit');
    Route::get('/{id}', [SubjectController::class, 'getQuestionsSubject'])->can('viewAny', Question::class)->name('subjects.getQuestionsSubject');//student
    Route::get('/', [SubjectController::class, 'index'])->can('viewAny', Question::class)->name('subjects.index');
    Route::post('/', [SubjectController::class, 'store'])->can('create', Question::class)->name('subjects.store');
    Route::put('/{id}', [SubjectController::class, 'update'])->can('create', Question::class)->name('subjects.update');
    Route::delete('/{id}', [SubjectController::class, 'destroy'])->can('create', Question::class)->name('subjects.destroy');
});

Route::middleware('auth')->prefix('tests')->group(function () {
    Route::get('/current/{interview_id}', [InterviewController::class, 'current'])->can('viewAny', Interview::class)->name('tests.current');
    Route::get('/{post_id}', [InterviewController::class, 'getPostInterview'])->can('viewAny', Interview::class)->name('tests.getPostTest');//student
    Route::get('/is-expired/{interview_id}', [InterviewController::class, 'checkInterviewExpiration'])->name('tests.checkInterviewExpiration');//student
    Route::get('/show/{interview_id}', [InterviewController::class, 'show2'])->can('viewAny', Interview::class)->name('tests.show');
    Route::get('/', [InterviewController::class, 'index'])->can('viewAny', Interview::class)->name('tests.index');
    Route::post('/active/{interview_id]', [InterviewController::class, 'activateInterview'])->can('create', Interview::class)->name('tests.activateInterview');
    Route::post('/expire/{interview_id]', [InterviewController::class, 'expireInterview'])->can('create', Interview::class)->name('tests.expireInterview');
    Route::post('/', [InterviewController::class, 'store'])->can('create', Interview::class)->name('tests.store');
    Route::put('/{id}', [InterviewController::class, 'update'])->can('create', Interview::class)->name('tests.update');
    Route::delete('/{id}', [InterviewController::class, 'destroy'])->can('create', Interview::class)->name('tests.destroy');
});

Route::middleware('auth')->prefix('results')->group(function () {
    Route::get('/', [ResultController::class, 'index'])->can('viewAny', Interview::class)->name('results.index');
});

Route::middleware('auth')->prefix('students-answers')->group(function () {
    Route::get('/{id}', [CandidateAnswerController::class, 'index'])->can('viewAny', CandidateAnswer::class)->name('student_answers.index');
    Route::get('/{candidate_id}/{interview_id}', [CandidateAnswerController::class, 'candidateInterviewAnswers'])->name('student_answers.studentTestAnswers');//student
    Route::post('/', [CandidateAnswerController::class, 'store'])->can('create', CandidateAnswer::class)->name('student_answers.store');//student
    Route::put('/{id}', [CandidateAnswerController::class, 'store'])->can('update', CandidateAnswer::class)->name('student_answers.update');
    Route::delete('/{id}', [CandidateAnswerController::class, 'destroy'])->can('delete', CandidateAnswer::class)->name('student_answers.destroy');
});

Route::middleware('auth')->prefix('note')->group(function () {
    Route::put('/{note}', [CandidateNoteController::class, 'update'])->name('student_note.update');
});

Route::middleware('auth')->prefix('is-student-passed')->group(function () {
    Route::get('/{interview_id}/{candidate_id}', [CandidateNoteController::class, 'checkCandidateNotes'])->name('student_note.checkCandidateNotes');//student
});

require __DIR__.'/auth.php';
