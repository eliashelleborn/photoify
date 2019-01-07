<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['index', 'show', 'votes']]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return User::all();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        return response()->json($user);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {

        if ($user->id === Auth::user()->id) {
            $request->validate([
                'name' => 'string',
                'biography' => 'string|max:150',
                'username' => 'string|min:5|max:32|unique:users',
                'email' => 'string|email|unique:users',
            ]);

            foreach ($request->all() as $key => $value) {
                if (Schema::hasColumn($user->getTable(), $key)) {
                    $user[$key] = $value;
                }
            }

            $user->save();

            return response()->json($user);
        }

        return response()->json(['message' => 'Unauthorized'], 401);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, User $user)
    {
        $forceDelete = $request->input('force_delete', false);

        if ($user->id === Auth::user()->id) {
            if ($forceDelete === true) {
                $user->forceDelete();
                return response()->json(['message' => 'Successfully deleted user', 'force_delete' => true]);
            } else {
                $user->delete();
                return response()->json(['message' => 'Successfully deleted user', 'force_delete' => false]);
            }
        }

        return response()->json(['message' => 'Unauthorized'], 401);
    }

    public function updateAvatar(Request $request, User $user)
    {
        $path = Storage::putFile('public/avatars', $request->file('avatar'));
        $authUser = Auth::user();
        if ($user === $authUser) {
            $user->avatar = Storage::url($path);
            $user->save();
            return response()->json($user);
        }
        return response()->json(['message' => 'Unauthorized'], 401);
    }

    public function removeAvatar(Request $request, User $user)
    {
        if (isset($user)) {
            if ($user->id === Auth::user()->id) {
                $user->avatar = null;
                $user->save();
                return response()->json($user);
            }
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        return response()->json(['message' => 'User not found'], 404);
    }

    public function votes(Request $request, User $user)
    {
        return $user->votes;
    }
}