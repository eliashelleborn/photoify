<?php

namespace App\Http\Controllers;

use App\Post;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['index', 'show', 'postsByUser', 'search']]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Post::with('user')->get();
    }

    public function search(Request $request)
    {
        $query = $request->get('query');

        if (!$query || $query === '') {
            return response()->json(['message' => 'You havent provided a search query'], 400);
        }

        $result = Post::where('description', 'LIKE', '%' . $query . '%')->get();

        return response()->json($result);
    }

    public function postsByUser(User $user)
    {
        $post = null;
        if (Auth::check()) {
            $posts = $user->posts()
                ->latest()
                ->with(['myVote'])
                ->withCount(['likes', 'dislikes'])
                ->get();
        } else {
            $posts = $user->posts()
                ->latest()
                ->withCount(['likes', 'dislikes'])
                ->get();
        }

        return response()->json($posts);
    }

    public function feed()
    {
        $userIds = Auth::user()->following()->pluck('followee_id');
        $userIds[] = Auth::id();
        $posts = Post::whereIn('user_id', $userIds)
            ->latest()
            ->with(['user', 'myVote'])
            ->withCount(['votes',
                'votes as likes_count' => function ($query) {
                    $query->where('type', 'like');
                },
                'votes as dislikes_count' => function ($query) {
                    $query->where('type', 'dislike');
                }])
            ->get();

        return response()->json($posts);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'image' => 'required|file|image',
            'description' => 'nullable|string|max:150',
        ]);

        $path = Storage::putFile('public/posts', $request->file('image'));

        $post = new Post([
            'image' => Storage::url($path),
            'description' => $request->description ?? null,
        ]);

        $post->user()->associate(Auth::user());
        $post->save();

        return response()->json($post);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function show(Post $post)
    {
        return response()->json($post);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Post $post)
    {
        if ($post->user_id === Auth::user()->id) {
            $request->validate([
                'image' => 'file|image',
                'description' => 'nullable|string|max:150',
            ]);

            if (isset($request->image)) {
                $path = Storage::putFile('public/posts', $request->file('image'));
                $post->image = Storage::url($path);
            }

            $post->description = $request->description; /* ?? $post->description; */

            $post->save();

            return response()->json($post);
        }

        return response()->json(['message' => 'Unauthorized'], 401);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function destroy(Post $post)
    {
        if ($post->user_id === Auth::user()->id) {
            $post->delete();
            return response()->json(['message' => 'Successfully deleted post']);
        }
        return response()->json(['message' => 'Unauthorized'], 401);
    }
}