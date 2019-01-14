<?php

namespace App;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'username', 'email', 'password', 'biography', 'avatar',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'following_count' => 'int',
        'followers_count' => 'int',
        'votes_count' => 'int',
        'dislikes_count' => 'int',
        'likes_count' => 'int',
    ];

    /**
     * Relations
     */
    public function posts()
    {
        return $this->hasMany(Post::class, 'user_id');
    }

    public function votes()
    {
        return $this->hasMany(Vote::class, 'user_id');
    }

    public function likes()
    {
        return $this->hasMany(Vote::class, 'user_id')->where('type', 'like');
    }

    public function dislikes()
    {
        return $this->hasMany(Vote::class, 'user_id')->where('type', 'dislike');
    }

    public function followers()
    {
        return $this->belongsToMany(
            User::class,
            'follows',
            'followee_id',
            'follower_id'
        )->withTimestamps();
    }
    public function following()
    {
        return $this->belongsToMany(
            User::class,
            'follows',
            'follower_id',
            'followee_id'
        )->withTimestamps();
    }

    public function myFollow()
    {
        if (Auth::check()) {
            return $this->hasOne(Follow::class, 'followee_id')->where('follower_id', Auth::id());
        }

    }

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = ['deleted_at'];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
    public function setPasswordAttribute($password)
    {
        if (!empty($password)) {
            $this->attributes['password'] = bcrypt($password);
        }
    }
}