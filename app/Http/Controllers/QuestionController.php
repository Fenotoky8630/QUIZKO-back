<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Question;
use App\Models\Answer;
use Inertia\Inertia;

class QuestionController extends Controller
{
    public function index()
    {
        $questions = Question::with('answers')->orderByDesc("created_at")->get();
        return Inertia::render('QuestionAnswer/Index', [
            'questions' => $questions,
        ]);
    }

    /**
     * Crée une nouvelle question avec des réponses.
     *
     * @param  Request  $request
     * 
     */
    public function store(Request $request)
    {
        $request->validate([
            'question' => 'required|string|max:255',
            'point' => 'required|integer',
            'type' => 'required|string',
            'answers' => 'required|array',
            'answers.*.answer' => 'required|string|max:255',
            'answers.*.is_correct' => 'required|boolean',
        ]);

        $question = new Question();
        $question->question = $request->input('question');
        $question->point = $request->input('point');
        $question->type = $request->input('type');
        $question->save();

        foreach ($request->input('answers') as $answerData) {
            $answer = new Answer();
            $answer->answer = $answerData['answer'];
            $answer->is_correct = $answerData['is_correct'];
            $answer->question_id = $question->id;
            $answer->save();
        }

        redirect(route('questions.index'));
    }

    public function show($id)
    {
        $question = Question::findOrFail($id);
        $question->load('answers');
        return response()->json(['question' => $question]);
    }


        public function update(Request $request, $id)
        {
            $request->validate([
                'question' => 'required|string|max:255',
                'point' => 'required|integer',
                'type' => 'required|string',
                'answers' => 'required|array', 
                'answers.*.answer' => 'required|string|max:255',
                'answers.*.is_correct' => 'required|boolean',
            ]);

            $question = Question::findOrFail($id);

            $question->question = $request->input('question');
            $question->type = $request->input('type');
            $question->point = $request->input('point');

            $question->save();

            $question->answers()->delete(); 

            foreach ($request->input('answers') as $answerData) {
                $answer = new Answer();
                $answer->answer = $answerData['answer'];
                $answer->is_correct = $answerData['is_correct'];
                $answer->question_id = $question->id;
                $answer->save();
            }

            return redirect(route('questions.index'));
    }

    public function destroy($id)
    {
        $question = Question::findOrFail($id);
        $question->delete();

        return redirect(route('questions.index'));
    }
}