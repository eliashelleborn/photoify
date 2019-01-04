<?php

namespace Tests\Feature;

use App\Post;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

/**
 * @testdox Posts\Delete
 * @group posts
 * @group posts-delete
 */
class PostsDeleteTest extends TestCase
{
    use DatabaseMigrations;

    /**
     * @test
     */
    public function user_can_delete_post()
    {
        $user = $this->createUser();

        Storage::fake('posts');
        $file = UploadedFile::fake()->image('post.jpg');

        $post = factory(Post::class)->create([
            'image' => $file,
            'user_id' => $user->id,
        ]);

        $this->json('POST', 'api/posts/' . $post->id . '?_method=DELETE', [], $this->authHeaders($user))
            ->assertStatus(200)
            ->assertJson([
                'message' => 'Successfully deleted post',
            ]);

        Storage::disk('public')->assertMissing('posts/' . $file->hashName());
    }

    /**
     * @test
     */
    public function user_can_not_delete_other_users_post()
    {
        $user = $this->createUser();
        $post = factory(Post::class)->create();

        $this->json('POST', 'api/posts/' . $post->id . '?_method=DELETE', [], $this->authHeaders($user))
            ->assertStatus(401)
            ->assertJson([
                'message' => 'Unauthorized',
            ]);
    }
}
