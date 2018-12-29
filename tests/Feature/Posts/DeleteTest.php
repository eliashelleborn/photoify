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
     * @testdox Delete post
     */
    public function testDeletePost()
    {
        $user = $this->createTestUser();

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
     * @testdox Unauthorized to delete other users post
     */
    public function testDeletePostUnauthorized()
    {
        $user = $this->createTestUser();
        $post = factory(Post::class)->create();

        $this->json('POST', 'api/posts/' . $post->id . '?_method=DELETE', [], $this->authHeaders($user))
            ->assertStatus(401)
            ->assertJson([
                'message' => 'Unauthorized',
            ]);
    }
}
