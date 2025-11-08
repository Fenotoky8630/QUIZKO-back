<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user=Auth::user();
        if( $user &&( $user->role==="admin"||$user->role=="recruiter")){
            $posts = Post::with('candidates.user')->get();
            return Inertia::render('Post/Index', [
             'posts' => $posts,
         ]);
        }else{
            $posts = Post::all();
            return response()->json(['data' =>$posts]);  
        }
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
        $request->validate([
            'name' => 'required|unique:posts|max:255',
            'description' => 'required|max:255',
        ], [
            'name.required' => 'Le champ nom est requis.',
            'name.unique' => 'Ce nom est déjà pris.',
            'name.max' => 'Le champ nom ne doit pas dépasser 255 caractères.',
            'description.required' => 'Le champ description est requis.',
            'description.max' => 'Le champ description ne doit pas dépasser 255 caractères.',
        ]);
        $post = new Post();
        $post->name = $request->input('name');
        $post->description = $request->input('description');
        $post->save();

        redirect(route('levels.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $post = Post::find($id);
        $posts = Post::all();
        $post->load(['candidates.user','candidates.candidate_notes.interview']);
        if (!$post) {
            return back();
        }
        return Inertia::render('Post/Detail', [
            'post' => $post,
            'posts' => $posts,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|max:255',
            'description' => 'required|max:255',
        ], [
            'name.required' => 'Le champ nom est requis.',
            'name.max' => 'Le champ nom ne doit pas dépasser 255 caractères.',
            'description.required' => 'Le champ description est requis.',
            'description.max' => 'Le champ description ne doit pas dépasser 255 caractères.',
        ]);
        $post = Post::find($id);
        if (!$post) {
            redirect(route('levels.index'));
        }

        $post->name = $request->input('name');
        $post->description = $request->input('description');
        $post->is_available = $request->input('is_available');
        $post->nb_allowed = $request->input('nb_allowed');
        $post->save();

        redirect(route('levels.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $post = Post::find($id);
        if (!$post) {
            redirect(route('levels.index'));
        }
        $post->delete();
        redirect(route('levels.index'));
    }
}
