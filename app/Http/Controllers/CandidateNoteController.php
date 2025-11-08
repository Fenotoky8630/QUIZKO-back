<?php

namespace App\Http\Controllers;

use App\Models\CandidateNote;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CandidateNoteController extends Controller
{
   
   
    public function checkCandidateNotes($interview_id, $candidate_id)
    {
        $exists = CandidateNote::where('interview_id', $interview_id)
                            ->where('candidate_id', $candidate_id)
                            ->exists();
        return response()->json(['exists' => $exists]);
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(CandidateNote $candidateNote)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CandidateNote $candidateNote)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, CandidateNote $note)
    {
        $request->validate([
            'note' => 'required|numeric',
       ]);
        // $candidateNote = CandidateNote::where('interview_id', $interview_id)
        // ->where('candidate_id', $candidate_id)
        // ->first();
        // if (!$candidateNote) {
        //     return redirect()->back()->with('error', 'Note du candidat non trouvée');
        // }
       
        $note->update([
            'note' => $request->input('note')
        ]);
        return redirect()->back()->with('success', 'Note du candidat mise à jour avec succès');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CandidateNote $candidateNote)
    {
        //
    }
}
