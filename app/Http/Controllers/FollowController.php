<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class FollowController extends Controller
{
    public function followers(Request $request, User $user)
    {
        return response()->json($user->followers);
    }

    public function following(Request $request, User $user)
    {
        return response()->json($user->following);
    }

    public function create(Request $request)
    {

    }
}