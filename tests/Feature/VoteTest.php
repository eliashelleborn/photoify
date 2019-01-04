<?php

namespace Tests\Feature;

use App\Post;
use App\Vote;
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
    public function user_can_like_posts()
    {
        $user = $this->createUser();
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
    public function user_can_dislike_posts()
    {
        $user = $this->createUser();
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
        $user = $this->createUser();
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
    public function vote_requires_valid_type()
    {
        $user = $this->createUser();
        $post = factory(Post::class)->create();

        $postData = ['type' => 'blablabla'];

        $this->json('POST', 'api/posts/' . $post->id . '/votes', $postData, $this->authHeaders($user))
            ->assertStatus(422)
            ->assertJsonValidationErrors('type');
    }

    /**
     * @test
     */
    public function user_can_remove_vote()
    {
        $user = $this->createUser();
        $post = factory(Post::class)->create();
        $vote = factory(Vote::class)->create([
            'user_id' => $user->id,
            'voted_id' => $post->id,
            'voted_type' => get_class($post),
        ]);
        

        $this->json('POST', 'api/posts/' . $vote->voted_id . '/votes?_method=DELETE', [], $this->authHeaders($user))
            ->assertJson(['message' => 'Successfully removed vote']);

        $this->assertDatabaseMissing('votes', ['voted_id' => $vote->voted_id, 'user_id' => $vote->user_id]);
    }

    /**
     * @test
     */
    public function remove_vote_requires_user_to_have_voted()
    {
        $user = $this->createUser();
        $post = factory(Post::class)->create();
        

        $this->json('POST', 'api/posts/' . $post->id . '/votes?_method=DELETE', [], $this->authHeaders($user))
            ->assertStatus(400)
            ->assertJson(['message' => 'You havent voted yet']);
    }

    /**
     * @test
     */
    public function guest_can_not_remove_vote()
    {
        $vote = factory(Vote::class)->create();

        $this->json('POST', 'api/posts/' . $vote->voted_id . '/votes?_method=DELETE')
            ->assertStatus(401)
            ->assertJson(['message' => 'Unauthenticated.']);

        $this->assertDatabaseHas('votes', ['voted_id' => $vote->voted_id, 'user_id' => $vote->user_id]);
    }

}
