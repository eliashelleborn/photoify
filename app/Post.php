<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User;
use Illuminate\Support\Facades\Auth;

class Post extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'image', 'description',
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'user_id' => 'int',
        'votes_count' => 'int',
        'likes_count' => 'int',
        'dislikes_count' => 'int',
    ];

    /**
     * Relations
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function votes()
    {
        return $this->morphMany(Vote::class, 'voted');
    }

    public function likes()
    {
        return $this->morphMany(Vote::class, 'voted')->where('type', 'like');
    }

    public function dislikes()
    {
        return $this->morphMany(Vote::class, 'voted')->where('type', 'dislike');
    }

    public function myVote()
    {
        if (Auth::check()) {
            return $this->hasOne(Vote::class, 'voted_id')->where('user_id', Auth::id());
        }

    }
}