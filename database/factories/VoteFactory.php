<?php

use App\Post;
use App\User;
use Faker\Generator as Faker;

$factory->define(App\Vote::class, function (Faker $faker) {
    return [
        'type' => $faker->randomElement(['like', 'dislike']),
        'user_id' => function () {
            return factory(User::class)->create()->id;
        },
        'voted_id' => function () {
            return factory(Post::class)->create();
        },
        'voted_type' => Post::class,

    ];
});