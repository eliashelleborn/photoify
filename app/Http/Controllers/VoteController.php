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

        $vote = $post->votes()->where('user_id', Auth::id())->first();

        if ($vote === null) {
            $vote = Vote::create([
                'type' => $request->type,
                'user_id' => Auth::id(),
                'voted_id' => $post->id,
                'voted_type' => get_class($post),
            ]);

            return response()->json($vote);
        } else if ($vote->type !== $request->type) {
            $vote->type = $request->type;
            $vote->save();
            return response()->json($vote);
        }
        return response()->json(['message' => 'You have already voted'], 400);
    }

    public function destroy(Post $post)
    {
        if ($post->votes()->where('user_id', Auth::id())->exists()) {
            $post->votes()->where('user_id', Auth::id())->delete();
            return response()->json(['message' => 'Successfully removed vote']);
        }
        return response()->json(['message' => 'You havent voted yet'], 400);
    }
}