<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Answer;
use App\Models\Candidate;
use App\Models\CandidateAnswer;
use App\Models\CandidateNote;
use App\Models\Interview;
use Inertia\Inertia;
use App\Http\Controllers\TextSimilarityController;
use Illuminate\Support\Facades\Auth;
class CandidateAnswerController extends Controller
{
    /**
     * Affiche la liste de toutes les réponses des candidats.
     *
     */
    public function index($id)
        {
            $interview= Interview::findOrFail($id)->with('post')->get();
            $interviewResults= CandidateNote::where('interview_id', $id)->with(['candidate.user','candidate.post'])->get();
            $candidateAnswers = CandidateAnswer::with(['answer.question', 'interview.candidate_notes', 'candidate.user','candidate.candidate_notes.interview'])
                ->where('interview_id', $id)
                ->get();

            $formattedData = [];

            foreach ($candidateAnswers as $candidateAnswer) {
                if (!array_key_exists($candidateAnswer->candidate_id, $formattedData)) {
                    $formattedData[$candidateAnswer->candidate_id] = [
                        'candidate' => [
                            'id' => $candidateAnswer->candidate_id,
                            'name' => $candidateAnswer->candidate->user->name,
                            'matricule' => $candidateAnswer->candidate->registration_number,     
                            // 'last_name' => $candidateAnswer->candidate->user->last_name,              
                        ],
                        'answers' => [],
                        //'note' => $candidateAnswer->candidate->candidate_notes[0]->note,
                        'note' => CandidateNote::where('candidate_id', $candidateAnswer->candidate_id)->first(),
                    ];
                }

                $formattedData[$candidateAnswer->candidate_id]['answers'][] = [
                    'id' => $candidateAnswer->id,
                    'question' => $candidateAnswer->answer->question->question,
                    'question_point' => $candidateAnswer->answer->question->point,
                    'answer' => $candidateAnswer->answer->answer,
                    'answer_of_candidate' => $candidateAnswer->answer_of_candidate,
                    'answer_point' => $candidateAnswer->point,
                    'is_correct' => $candidateAnswer->answer->is_correct,
                ];
            }
            return Inertia::render('Interview/Detail', [
                'candidate_answers' => array_values($formattedData),
                'interview'=>$interview,
                'interviewResults'=>$interviewResults,
            ]);
        }
        
        public function candidateInterviewAnswers($candidate_id, $interview_id)
        {
            $user=Auth::user();
            $candidateAnswers = CandidateAnswer::with(['answer.question.answers'])
            ->where('candidate_id', $candidate_id)
            ->where('interview_id', $interview_id)
            ->get();
            $candidate = Candidate::where('id', $candidate_id)->with('user')->first();
             $note = CandidateNote::where('interview_id', $interview_id)
            ->where('candidate_id', $candidate_id)
            ->first();
        $data = $candidateAnswers->map(function ($candidateAnswer) {
            $questionAnswers = $candidateAnswer->answer->question->answers->map(function ($answer) use ($candidateAnswer) {
                return [
                    'answer' => $answer->answer,
                    'is_correct' => $answer->is_correct,
                    'is_candidate_answer' => $candidateAnswer->answer_id == $answer->id,
                    'candidate_answer' => $candidateAnswer->answer_of_candidate,
                ];
            });
    

            return [
                'question' => $candidateAnswer->answer->question->question,
                'point' => $candidateAnswer->answer->question->point,
                'question_type' => $candidateAnswer->answer->question->type,
                'answers' => $questionAnswers,
            ];
         });
            if( $user &&( $user->role==="admin"||$user->role=="recruiter")){
                return Inertia::render('Result/Detail', [
                    'questions' => $data,
                    'note' => $note,
                    'candidate' => $candidate,
                ]);
            }else{
                return response()->json([
                    'data' => $data,
                    'note' => $note,
                ]);
            }
        }
        
        
         public function store(Request $request)
        {
                $data = $request->validate([
                    'candidate_id' => 'required|exists:candidates,id',
                    'interview_id' => 'required|exists:interviews,id',
                    'candidate_answers' => 'array',
                    'candidate_answers.*.answer_id' => 'required|exists:answers,id',
                    'candidate_answers.*.answer_of_candidate' => 'nullable',
                ]);
            
                    $interview = Interview::find($data['interview_id']);
                    if ($interview->is_expired) {
                        return response()->json(['message' => 'L\'entretien est expiré, vous ne pouvez pas enregistrer de réponses.'], 400);
                    }
                $totalPoints = 0;
            
                foreach ($data['candidate_answers'] as $candidateAnswer) {
                    $answer = Answer::find($candidateAnswer['answer_id']);
                    $question = $answer->question;
                    
                    // Vérifier si la réponse quiz du candidat est correcte 
                    if ($answer->is_correct && $question->type === 'qcm') {
                        // Si oui, attribuer le nombre de points de la question
                        $totalPoints += $answer->question->point;
                    } elseif ($question->type === 'response') {
                        try {
                            $similarityController = app(TextSimilarityController::class);
                            $response = $similarityController->evaluate($answer->answer, $candidateAnswer['answer_of_candidate']);
                            $responseData = $response->getData();
                            $similarity = $responseData->similarity;
                            $point = $answer->question->point * $similarity;
                            $point = $this->roundPoint($point);

                            $totalPoints += $point;
                        } catch (\Exception $e) {
                            return response()->json(['message' => 'Erreur lors de l\'appel de l\'API: ' . $e->getMessage()], 500);
                        }
                         $totalPoints += $answer->question->point;
                    }

                    // Enregistrer la réponse du candidat
                    CandidateAnswer::create([
                        'interview_id' => $data['interview_id'],
                        'candidate_id' => $data['candidate_id'],
                        'answer_id' => $candidateAnswer['answer_id'],
                        'answer_of_candidate' => $candidateAnswer['answer_of_candidate'] ?? null,
                        'point' => $answer->is_correct ? $answer->question->point : 0,
                    ]);
                }
                    CandidateNote::create([
                        'interview_id' => $data['interview_id'],
                        'candidate_id' => $data['candidate_id'],
                        'interim_note' => $totalPoints,
                    ]);
            
                return response()->json(['message' => 'Réponses d\'un étudiant enregistrée avec succès.', 'total_points' => $totalPoints]);
        }

    public function destroy($id)
    {
        $candidateAnswer = CandidateAnswer::findOrFail($id);
        $candidateAnswer->delete();

        return response()->json(['message' => 'Réponse de candidat supprimée avec succès !']);
    }

    private function roundPoint($point)
    {
        // Récupérer la partie décimale du point
        $decimalPart = $point - floor($point);

        // Si la partie décimale est inférieure à 0.5, arrondir vers le bas (pas de chiffre après la virgule)
        if ($decimalPart < 0.5) {
            $roundedPoint = floor($point);
        } else {
            // Sinon, arrondir vers le haut
            $roundedPoint = ceil($point);
        }

        return $roundedPoint;
    }
}
  