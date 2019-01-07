<?php

use App\User;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Test user
        factory(User::class)->create([
            'name' => 'Elias Johansson',
            'biography' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum provident magnam voluptates quidem, ipsa molestiae fuga ullam deserunt at aspernatur! Saepe vero, voluptates animi mollitia sint voluptatum ducimus ipsa vel?',
            'username' => 'EliasJ',
            'email' => 'elias_johansson@hotmail.se',
            'email_verified_at' => now(),
            'password' => bcrypt('123'),
            'remember_token' => str_random(10),
        ]);

        factory(User::class, 100)->create();
    }
}
