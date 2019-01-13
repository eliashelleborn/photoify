<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FollowController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['followers', 'following']]);
    }
    public function followers(Request $request, User $user)
    {
        return response()->json($user->followers);
    }

    public function following(Request $request, User $user)
    {
        return response()->json($user->following);
    }

    public function create(User $user)
    {
        if (!Auth::user()->following->contains($user->id)) {
            Auth::user()->following()->attach($user->id);
            return response()->json(['message' => 'Successfully followed user']);
        }
        return response()->json(['message' => 'You are already following this user'], 400);
    }

    public function destroy(User $user)
    {

    }
}