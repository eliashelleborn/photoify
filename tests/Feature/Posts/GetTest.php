<?php

namespace Tests\Feature;

use App\Post;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Tests\TestCase;

/**
 * @testdox Posts\Get
 * @group posts
 * @group posts-get
 */
class PostsGetTest extends TestCase
{
    use DatabaseMigrations;

    /**
     * @testdox Get post by ID
     */
    public function testGetPostById()
    {
        $post = factory(Post::class)->create();

        $this->json('GET', 'api/posts/' . $post->id)
            ->assertStatus(200)
            ->assertJsonStructure([
                'id', 'image', 'description', 'user_id', 'created_at', 'updated_at',
            ]);
    }

    /**
     * @testdox Provided post ID not found (404)
     */
    public function testProvidedPostIdNotFound()
    {
        $this->json('GET', 'api/posts/' . 999)
            ->assertStatus(404);
    }

}
