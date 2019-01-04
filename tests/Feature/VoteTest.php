<?php

namespace Tests\Feature;

use App\Post;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Tests\TestCase;

/**
 * @testdox Votes
 * @group votes

 */
class VoteTest extends TestCase
{
    use DatabaseMigrations;

    /**
     * @test
     */
    public function authenticated_user_can_like_posts()
    {
        $user = $this->createTestUser();
        $post = factory(Post::class)->create();

        $postData = [
            'type' => 'like',
        ];

        $this->json('POST', 'api/posts/' . $post->id . '/votes', $postData, $this->authHeaders($user))
            ->assertJson(['type' => 'like']);

        $this->assertCount(1, $post->votes);
    }

    /**
     * @test
     */
    public function authenticated_user_can_dislike_posts()
    {
        $user = $this->createTestUser();
        $post = factory(Post::class)->create();

        $postData = [
            'type' => 'dislike',
        ];

        $this->json('POST', 'api/posts/' . $post->id . '/votes', $postData, $this->authHeaders($user))
            ->assertJson(['type' => 'dislike']);

        $this->assertCount(1, $post->votes);
    }

    /**
     * @test
     */
    public function user_can_only_vote_on_post_once()
    {
        $user = $this->createTestUser();
        $post = factory(Post::class)->create();

        $postData = ['type' => 'like'];

        $this->json('POST', 'api/posts/' . $post->id . '/votes', $postData, $this->authHeaders($user));
        $this->json('POST', 'api/posts/' . $post->id . '/votes', $postData, $this->authHeaders($user))
            ->assertStatus(400)
            ->assertJson(['message' => 'You have already voted']);

        $this->assertCount(1, $post->votes);
    }

    /**
     * @test
     */
    public function guest_can_not_vote()
    {
        $post = factory(Post::class)->create();

        $postData = ['type' => 'like'];

        $this->json('POST', 'api/posts/' . $post->id . '/votes', $postData)
            ->assertStatus(401)
            ->assertJson(['message' => 'Unauthenticated.']);
    }

    /**
     * @test
     */
    public function invalid_vote_type_returns_an_error()
    {
        $user = $this->createTestUser();
        $post = factory(Post::class)->create();

        $postData = ['type' => 'blablabla'];

        $this->json('POST', 'api/posts/' . $post->id . '/votes', $postData, $this->authHeaders($user))
            ->assertStatus(422)
            ->assertJsonValidationErrors('type');
    }
}
