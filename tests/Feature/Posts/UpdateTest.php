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
     * @test
     */
    public function user_can_update_post_description()
    {
        $user = $this->createUser();

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
                'id', 'description', 'image', 'user_id', 'created_at', 'updated_at',
            ])
            ->assertJson([
                'description' => 'New description',
            ]);
    }

    /**
     * @test
     */
    public function user_can_update_post_image()
    {
        $user = $this->createUser();

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
                'id', 'description', 'image', 'user_id', 'created_at', 'updated_at',
            ])
            ->assertJson([
                'image' => '/storage/posts/' . $newFile->hashName(),
            ]);

        Storage::disk('public')->assertExists('posts/' . $newFile->hashName());
        Storage::disk('public')->delete('posts/' . $file->hashName());
        Storage::disk('public')->delete('posts/' . $newFile->hashName());
    }

    /**
     * @test
     */
    public function user_can_not_update_other_users_post()
    {
        $user = $this->createUser();
        $post = factory(Post::class)->create();

        $body = ['description' => 'New description'];

        $this->json('POST', 'api/posts/' . $post->id . '?_method=PUT', $body, $this->authHeaders($user))
            ->assertStatus(401)
            ->assertJson([
                'message' => 'Unauthorized',
            ]);
    }
}
