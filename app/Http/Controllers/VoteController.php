<?php

namespace App\Http\Controllers;

use App\Post;
use App\Vote;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class VoteController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => []]);
    }

    public function store(Request $request, Post $post)
    {
        $request->validate([
            'type' => 'string|required|in:like,dislike',
        ]);

        if (!$post->votes()->where('user_id', Auth::id())->exists()) {
            $vote = Vote::create([
                'type' => $request->type,
                'user_id' => Auth::id(),
                'voted_id' => $post->id,
                'voted_type' => get_class($post),
            ]);

            return response()->json($vote);
        }
        return response()->json(['message' => 'You have already voted'], 400);
    }

    public function deleteVote()
    {

    }
}
