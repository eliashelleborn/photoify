<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

/**
 * @testdox Posts\Create
 * @group posts
 * @group create
 */
class PostTest extends TestCase
{
    use DatabaseMigrations;

    /**
     * @testdox Create post
     */
    public function testCreatePost()
    {
        $user = $this->createTestUser();

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
     * @testdox Create post without description
     */
    public function testCreatePostWithoutDescription()
    {
        $user = $this->createTestUser();

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
     * @testdox Try creating post without an image (Error)
     */
    public function testCreatePostNoImageProvided()
    {
        $user = $this->createTestUser();

        Storage::fake('posts');
        $file = UploadedFile::fake()->image('post.jpg');

        $this->json('POST', 'api/posts/', ['image' => null], $this->authHeaders($user))
            ->assertStatus(422)
            ->assertJson([
                "message" => "The given data was invalid.",
                "errors" => [
                    "image" => [
                        "The image field is required.",
                    ],
                ]]);

        Storage::disk('public')->assertMissing('posts/' . $file->hashName());
    }

    /**
     * @testdox Try creating post with invalid filetype (Error)
     */
    public function testCreatePostInvalidImageFiletype()
    {
        $user = $this->createTestUser();

        Storage::fake('posts');
        $file = UploadedFile::fake()->create('post.pdf');

        $this->json('POST', 'api/posts/', ['image' => $file], $this->authHeaders($user))
            ->assertStatus(422)
            ->assertJson([
                "message" => "The given data was invalid.",
                "errors" => [
                    "image" => [
                        "The image must be an image.",
                    ],
                ]]);

        Storage::disk('public')->assertMissing('posts/' . $file->hashName());
    }
}
