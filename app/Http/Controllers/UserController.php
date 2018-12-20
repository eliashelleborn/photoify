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
        $this->middleware('auth:api', ['except' => ['index', 'show']]);
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
        return $user;
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
    public function destroy(User $user)
    {
        //
    }

    public function updateAvatar(Request $request)
    {
        /* $path = Storage::putFile('public/avatars', $request->file('avatar'));
    return response()->json(['message' => 'Saved avatar', 'path' => Storage::url($path)]); */
    }
}
