<?php

namespace Tests\Feature;

use App\Post;
use App\User;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Tests\TestCase;

/**
 * @testdox Search
 * @group search

 */
class SearchTest extends TestCase
{
    use DatabaseMigrations;

    /**
     * @test
     */
    public function can_search_for_posts()
    {
        $post = factory(Post::class)->create([
            'description' => 'This is a test description',
        ]);
        factory(Post::class)->create([
            'description' => 'Another test post',
        ]);

        $query = 'this is';

        $this->json('GET', 'api/posts/search?query=' . $query)
            ->assertStatus(200)
            ->assertJsonCount(1)
            ->assertJson([['id' => $post->id]]);
    }

    /**
     * @test
     */
    public function can_search_for_users()
    {
        $user = factory(User::class)->create([
            'username' => 'test-user',
        ]);
        factory(User::class)->create([
            'username' => 'dontfindme',
        ]);

        $query = 'test';

        $this->json('GET', 'api/users/search?query=' . $query)
            ->assertStatus(200)
            ->assertJsonCount(1)
            ->assertJson([['id' => $user->id]]);
    }

    /**
     * @test
     */
    public function query_is_required()
    {
        $query = '';

        $this->json('GET', 'api/posts/search?query=' . $query)
            ->assertStatus(400)
            ->assertJson(['message' => 'You havent provided a search query']);
        $this->json('GET', 'api/users/search?query=' . $query)
            ->assertStatus(400)
            ->assertJson(['message' => 'You havent provided a search query']);

        $this->json('GET', 'api/posts/search')
            ->assertStatus(400)
            ->assertJson(['message' => 'You havent provided a search query']);
        $this->json('GET', 'api/users/search')
            ->assertStatus(400)
            ->assertJson(['message' => 'You havent provided a search query']);
    }
}