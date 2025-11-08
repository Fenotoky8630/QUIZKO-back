<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Subject;
use App\Models\QuestionSubject;
use App\Models\Question;
use Illuminate\Support\Arr;
use Inertia\Inertia;


class SubjectController extends Controller
{

    public function index()
    {
        $subjects = Subject::with('questions.answers')->get();
        $questions = Question::all();
       // return response()->json(['data' => $subjects]);
       foreach ($subjects as $subject) {
           $totalPoints = 0;
            foreach ($subject->questions as $question) {
                $totalPoints += $question->point;
            }
             $subject->total_points = $totalPoints;
         }
        return Inertia::render('Subject/Index', [
            'subjects' => $subjects,
            'questions' => $questions,
        ]);
    }

    public function create()
    {
        $questions = Question::all();
        return Inertia::render('Subject/Create', [
            'questions' => $questions,
        ]);
    }
    public function edit($id)
    {
        $subjectData = Subject::with('questions.answers')->findOrFail($id);

        $questions = Question::all();
        return Inertia::render('Subject/Edit', [
            'questions' => $questions,
            'subjectData' => $subjectData,
        ]);
    }
    //Questions d'un sujet d'un Interview
    public function getQuestionsSubject($id)
    {
        $subject = Subject::with('questions.answers')->findOrFail($id);

        $transformedSubject = $subject->toArray();
        
        foreach ($transformedSubject['questions'] as &$question) {
            $question['answers'] = collect($question['answers'])->map(function($answer) {
                return [
                    'id' => $answer['id'],
                    'answer' => $answer['answer']
                ];
            })->toArray();
        }
    
        return response()->json(['data' => $transformedSubject]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'subject' => 'required|string|max:255',
            'questions' => 'required|array|min:1',
            ]);
        $subject = new Subject();
        $subject->subject = $request->input('subject');
        $subject->save();

       
        $questionsData = $request->input('questions'); 
        foreach ($questionsData as $question) {
            $subject->questions()->attach($question);
        }
           return redirect(route('subjects.index'));
        }

    public function destroy($id)
        {
            $subject= Subject::findOrFail($id); 
            $subject->delete();

            redirect(route('subjects.index'));
        }
        public function update(Request $request, $id)
        {
            $request->validate([
                'subject' => 'required|string|max:255',
                'questions' => 'required|array|min:1', 
            ]);
        
            $subject = Subject::findOrFail($id);
            $subject->subject = $request->input('subject');
            $subject->save();
        
            // Sync Questions (Detach old and attach new)
            $subject->questions()->detach(); // Detach all existing questions
        
            $questionsData = $request->input('questions');
            foreach ($questionsData as $question) {
                $subject->questions()->attach($question);
            }
        
            return redirect(route('subjects.index'));
        }        
    
}
