<?php

use App\Follow;
use App\Post;
use App\User;
use App\Vote;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        /*
        $this->call([
        UsersTableSeeder::class,
        ]);
         */

        // Test user for authentication
        factory(User::class)->create([
            'name' => 'Elias Johansson',
            'biography' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum provident magnam voluptates quidem, ipsa molestiae fuga ullam deserunt at aspernatur! Saepe vero, voluptates animi mollitia sint voluptatum ducimus ipsa vel?',
            'username' => 'EliasJ',
            'email' => 'elias_johansson@hotmail.se',
            'email_verified_at' => now(),
            'password' => 'password',
            'remember_token' => str_random(10),
        ]);

        factory(User::class, 10)->create()->each(function ($user) {
            factory(Post::class, rand(0, 5))->create(['user_id' => $user->id])->each(function ($post) {

                $randCount = rand(0, User::count());
                $randomUsers = User::inRandomOrder()->take($randCount)->get();

                $randomUsers->each(function ($randUser) use ($post) {
                    factory(Vote::class)->create(['user_id' => $randUser->id, 'voted_id' => $post->id]);
                });
            });
        });

        factory(Follow::class)->create(['follower_id' => 1, 'followee_id' => 2]);

    }
}