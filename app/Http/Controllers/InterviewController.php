<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Interview;
use App\Models\Post;
use App\Models\Subject;
use Inertia\Inertia;
use Carbon\Carbon;
use App\Events\InterviewStatusChanged;

class InterviewController extends Controller
{
     /**
     * Affiche la liste de tous les entretiens.
     *
     */
    public function index()
    {
        $posts= Post::all();
        $subjects= Subject::all();
        $interviews = Interview::with(['subject.questions.answers','post'])->get();
       // return response()->json(['data' => $interviews]);
       return Inertia::render('Interview/Index', [
        'posts' => $posts,
        'subjects' => $subjects,
        'interviews' => $interviews,
    ]);
    }
    /**
     * Affiche un entretien.
     *
     * @return \Illuminate\Http\JsonResponse
     */
   
    public function  getPostInterview($post_id)
    {
        $interviews = Interview::where('post_id','=',$post_id)->get();
        if ($interviews->isEmpty()) {
            return response()->json(['data' => []]);
        }    
        $interviews->load('subject', 'post');   
        return response()->json(['data' => $interviews]);
    }
    public function show($post_id)
    {
        $interview = Interview::where('post_id','=',$post_id)->get();
        $interview->load('subject', 'post');
        if (!$interview) {
            return response()->json(['message' => 'Interview not found'], 404);
        }
        return response()->json($interview);
    }
        /**
     * Affiche un entretien.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show2($interview_id)
    {
        $interview = Interview::where('id','=',$interview_id)->get();
        $interview->load('subject.questions.answers', 'post');
        if (!$interview) {
            return response()->json(['message' => 'Interview not found'], 404);
        }
        return response()->json($interview);
    }

    /**
     * Crée un nouvel entretien avec des sujets associés.
     *
     * @param  Request  $request
     * @
     */
    public function store(Request $request)
    {
        //$uuid = Uuid::uuid4()->toString();

        $request->validate([
            'name' => 'required|string|max:50',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'time' => 'required|date_format:H:i',
            'post_id' => 'required|exists:posts,id',
            'subject_id' => 'required|exists:subjects,id',
        ]);
       
        $interview = new Interview();
        $interview->name = $request->input('name');
        $interview->start_date = $request->input('start_date');
        $interview->end_date = $request->input('end_date');
        $interview->time = $request->input('time');
        $interview->post_id = $request->input('post_id');
        $interview->subject_id = $request->input('subject_id');
        $interview->save();

        redirect(route('tests.index'));
    }


    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:50',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'time' => 'required',
            'post_id' => 'required|exists:posts,id',
            'subject_id' => 'required|exists:subjects,id',
        ]);

        $interview = Interview::findOrFail($id);
        $interview->start_date = $request->input('start_date');
        $interview->end_date = $request->input('end_date');
        $interview->time = $request->input('time');
        $interview->post_id = $request->input('post_id');
        $interview->subject_id = $request->input('subject_id');

        $interview->save();
        redirect(route('tests.index'));
    }

    public function current($interview_id)
    {
        $interview = Interview::findOrFail($interview_id);
       $interview->load(["subject","post"]);
       return Inertia::render('Interview/Current', [
        'interview' => $interview,
    ]);
    }
    public function destroy($id)
    {
        $interview = Interview::findOrFail($id);
        $interview->delete();

        redirect(route('tests.index'));
    }

    public function checkInterviewExpiration($interview_id)
    {
        $interview = Interview::findOrFail($interview_id);
       
    }

    public function activateInterview(Request $request)
    {
        $interview_id= $request->interview_id;
        $interview = Interview::findOrFail($interview_id);
        $interview->is_active = true; 
        $interview->save();
    }
    public function expireInterview(Request $request)
    {
        $interview_id= $request->interview_id;
        $interview = Interview::findOrFail($interview_id);
        $interview->is_expired = true; 
        $interview->save();
    }
}


