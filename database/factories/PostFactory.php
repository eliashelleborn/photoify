<?php

use App\User;
use Faker\Generator as Faker;

$factory->define(App\Post::class, function (Faker $faker) {
    return [
        'image' => $faker->imageUrl(),
        'description' => $faker->text(150),
        'user_id' => function () {
            return factory(User::class)->create()->id;
        },
        'created_at' => $faker->dateTimeBetween('-1years', 'now', null),
        'updated_at' => null,
    ];
});