<?php

use Faker\Generator as Faker;
use App\User;

$factory->define(App\Post::class, function (Faker $faker) {
    return [
        'image' => $faker->imageUrl(),
        'description' => $faker->text(150),
        'user_id' => factory(User::class)->create()->id,
    ];
});
