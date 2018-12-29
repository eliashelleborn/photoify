<?php

namespace App\Http\Controllers;

use App\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['index', 'show']]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Post::all();
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
                'image' => 'required|file|image',
                'description' => 'nullable|string|max:150',
            ]);

            if (isset($request->image)) {
                $path = Storage::putFile('public/posts', $request->file('image'));
                $post->image = Storage::url($path);
            }

            $post->description = $request->description ?? $post->description;

            $post->save();

            return response()->json(['message' => 'Successfully updated post', 'post' => $post]);
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
