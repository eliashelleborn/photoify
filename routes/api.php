<?php

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
 */

Route::group([
    'prefix' => 'auth',
], function () {
    Route::post('login', 'AuthController@login')->name('login');
    Route::post('register', 'AuthController@register');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::get('me', 'AuthController@me');
});

Route::group(['prefix' => 'users'], function () {
    Route::get('/', 'UserController@index');
    Route::get('{user}', 'UserController@show');
    Route::put('{user}', 'UserController@update');
    Route::delete('{user}', 'UserController@destroy');
    Route::post('{user}/update_avatar', 'UserController@updateAvatar');
    Route::post('{user}/remove_avatar', 'UserController@removeAvatar');
});
