<?php

namespace Tests\Feature;

use App\User;
use App\Vote;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Tests\TestCase;

/**
 * @testdox User\Get
 * @group users
 * @group users-get
 */
class UserGetTest extends TestCase
{
    use DatabaseMigrations;

    /**
     * @test
     */
    public function can_get_user_by_username()
    {
        $user = factory(User::class)->create();

        $this->json('GET', 'api/users/' . $user->username)
            ->assertStatus(200)
            ->assertJson([

                'id' => $user->id,

            ]);
    }

    /**
     * @test
     */
    public function can_get_users_votes()
    {
        $vote = factory(Vote::class)->create();

        $this->json('GET', 'api/users/' . $vote->user_id . '/votes')
            ->assertStatus(200)
            ->assertJsonCount(1);
    }

    /**
     * @test
     */
    public function user_not_found()
    {
        $this->json('GET', 'api/posts/' . 999)
            ->assertStatus(404);
    }

}