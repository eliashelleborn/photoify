<?php

use App\User;
use Faker\Generator as Faker;

$factory->define(App\Follow::class, function (Faker $faker) {
    return [
        'follower_id' => function () {
            return factory(User::class)->create()->id;
        },
        'followee_id' => function () {
            return factory(User::class)->create()->id;
        },
    ];
});