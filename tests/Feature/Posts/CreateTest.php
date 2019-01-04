<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

/**
 * @testdox Posts\Create
 * @group posts
 * @group posts-create
 */
class PostsCreateTest extends TestCase
{
    use DatabaseMigrations;

    /**
     * @test
     */
    public function user_can_create_post()
    {
        $user = $this->createUser();

        Storage::fake('posts');
        $file = UploadedFile::fake()->image('post.jpg');

        $postData = [
            'image' => $file,
            'description' => 'This is a test',
        ];

        $this->json('POST', 'api/posts/', $postData, $this->authHeaders($user))
            ->assertStatus(200)
            ->assertJsonStructure([
                'id', 'image', 'description', 'user_id', 'created_at', 'updated_at',
            ]);

        Storage::disk('public')->assertExists('posts/' . $file->hashName());
        Storage::disk('public')->delete('posts/' . $file->hashName());
    }

    /**
     * @test
     */
    public function post_description_is_optional()
    {
        $user = $this->createUser();

        Storage::fake('posts');
        $file = UploadedFile::fake()->image('post.jpg');

        $postData = [
            'image' => $file,
        ];

        $this->json('POST', 'api/posts/', $postData, $this->authHeaders($user))
            ->assertStatus(200)
            ->assertJsonStructure([
                'id', 'image', 'description', 'user_id', 'created_at', 'updated_at',
            ])
            ->assertJson(['description' => null]);

        Storage::disk('public')->assertExists('posts/' . $file->hashName());
        Storage::disk('public')->delete('posts/' . $file->hashName());
    }

    /**
     * @test
     */
    public function post_requires_image()
    {
        $user = $this->createUser();

        Storage::fake('posts');
        $file = UploadedFile::fake()->image('post.jpg');

        $this->json('POST', 'api/posts/', ['image' => null], $this->authHeaders($user))
            ->assertStatus(422)
            ->assertJsonValidationErrors('image');

        Storage::disk('public')->assertMissing('posts/' . $file->hashName());
    }

    /**
     * @test
     */
    public function post_requires_correct_image_filetype()
    {
        $user = $this->createUser();

        Storage::fake('posts');
        $file = UploadedFile::fake()->create('post.pdf');

        $this->json('POST', 'api/posts/', ['image' => $file], $this->authHeaders($user))
            ->assertStatus(422)
            ->assertJsonValidationErrors('image');

        Storage::disk('public')->assertMissing('posts/' . $file->hashName());
    }
}
