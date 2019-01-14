<?php

namespace App\Http\Controllers;

use App\Follow;
use App\Notifications\UserFollowed;
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
        if (Auth::id() === $user->id) {
            return response()->json(['message' => 'You cannot follow yourself'], 400);
        }

        if (!Auth::user()->following->contains($user->id)) {

            $follow = Follow::create([
                'follower_id' => Auth::id(),
                'followee_id' => $user->id,
            ]);
            $user->notify(new UserFollowed(Auth::user()));
            return response()->json($follow);
        }

        return response()->json(['message' => 'You are already following this user'], 400);
    }

    public function destroy(User $user)
    {
        if (Auth::user()->following->contains($user->id)) {
            Auth::user()->following()->detach($user->id);
            return response()->json(['message' => 'Successfully unfollowed user']);
        }
        return response()->json(['message' => 'You are not following this user'], 400);
    }
}