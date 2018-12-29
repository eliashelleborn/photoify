<?php

namespace Tests\Feature;

use App\Post;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

/**
 * @testdox Posts\Update
 * @group posts
 * @group posts-update
 */
class PostsUpdateTest extends TestCase
{
    use DatabaseMigrations;

    /**
     * @testdox Update post description
     */
    public function testUpdatePostDescription()
    {
        $user = $this->createTestUser();

        Storage::fake('posts');
        $file = UploadedFile::fake()->image('post.jpg');

        $post = factory(Post::class)->create([
            'image' => $file,
            'user_id' => $user->id,
        ]);

        $body = ['description' => 'New description'];

        $this->json('POST', 'api/posts/' . $post->id . '?_method=PUT', $body, $this->authHeaders($user))
            ->assertStatus(200)
            ->assertJsonStructure([
                'message',
                'post' => [
                    'id', 'description', 'image', 'user_id', 'created_at', 'updated_at',
                ],
            ])
            ->assertJson([
                'message' => 'Successfully updated post',
                'post' => [
                    'description' => 'New description',
                ],
            ]);
    }

    /**
     * @testdox Update post image
     */
    public function testUpdatePostImage()
    {
        $user = $this->createTestUser();

        Storage::fake('posts');
        $file = UploadedFile::fake()->image('originalImage.jpg');

        $post = factory(Post::class)->create([
            'image' => $file,
            'user_id' => $user->id,
        ]);

        Storage::fake('posts');
        $newFile = UploadedFile::fake()->image('newImage.jpg');

        $body = ['image' => $newFile];

        $this->json('POST', 'api/posts/' . $post->id . '?_method=PUT', $body, $this->authHeaders($user))
            ->assertStatus(200)
            ->assertJsonStructure([
                'message',
                'post' => [
                    'id', 'description', 'image', 'user_id', 'created_at', 'updated_at',
                ],
            ])
            ->assertJson([
                'message' => 'Successfully updated post',
                'post' => [
                    'image' => '/storage/posts/' . $newFile->hashName(),
                ],
            ]);

        Storage::disk('public')->assertExists('posts/' . $newFile->hashName());
        Storage::disk('public')->delete('posts/' . $file->hashName());
        Storage::disk('public')->delete('posts/' . $newFile->hashName());
    }

    /**
     * @testdox Unauthorized to update other users post
     */
    public function testUpdatePostUnauthorized()
    {
        $user = $this->createTestUser();
        $post = factory(Post::class)->create();

        $body = ['description' => 'New description'];

        $this->json('POST', 'api/posts/' . $post->id . '?_method=PUT', $body, $this->authHeaders($user))
            ->assertStatus(401)
            ->assertJson([
                'message' => 'Unauthorized',
            ]);
    }
}
