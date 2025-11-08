<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Interview;
use App\Models\Post;
use App\Models\Subject;
use Inertia\Inertia;
class ResultController extends Controller
{
    public function index()
    {
        $posts= Post::all();
        $subjects= Subject::all();
        $interviews = Interview::with(['subject.questions.answers','post'])->get();
       return Inertia::render('Result/Index', [
        'posts' => $posts,
        'subjects' => $subjects,
        'interviews' => $interviews,
    ]);
    }
}
