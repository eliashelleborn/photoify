<?php

use App\Post;
use App\User;
use Faker\Generator as Faker;

$factory->define(App\Vote::class, function (Faker $faker) {
    $post = factory(Post::class)->create();
    return [
        'type' => $faker->randomElement(['like', 'dislike']),
        'user_id' => factory(User::class)->create()->id,
        'voted_id' => $post->id,
        'voted_type' => get_class($post),

    ];
});
