<?php

namespace Tests\Feature;

use App\Follow;
use App\User;
use App\Vote;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Tests\TestCase;

/**
 * @testdox User\Get
 * @group user
 * @group user-get
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
    public function can_get_users_followers()
    {
        $follow = factory(Follow::class)->create();

        $this->json('GET', 'api/users/' . $follow->followee_id . '/followers')
            ->assertStatus(200)
            ->assertJsonCount(1)
            ->assertJson([['id' => $follow->follower_id]]);
    }

    /**
     * @test
     */
    public function can_get_users_following()
    {
        $follow = factory(Follow::class)->create();

        $this->json('GET', 'api/users/' . $follow->follower_id . '/following')
            ->assertStatus(200)
            ->assertJsonCount(1)
            ->assertJson([['id' => $follow->followee_id]]);
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