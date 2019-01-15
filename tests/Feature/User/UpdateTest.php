<?php

namespace Tests\Feature;

use App\User;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

/**
 * @testdox User\Update
 * @group user
 * @group user-update
 */
class UserUpdateTest extends TestCase
{
    use DatabaseMigrations;

    /**
     * @test
     */
    public function user_can_update_self()
    {
        $user = $this->createUser();

        $newInfo = [
            'name' => 'new name',
            'username' => 'new username',
            'biography' => 'new bio',
            'email' => 'new@email.com',
        ];

        $this->json('POST', 'api/users/' . $user->id . '?_method=PUT', $newInfo, $this->authHeaders($user))
            ->assertStatus(200)

            ->assertJson($newInfo);
    }

    /**
     * @test
     */
    public function user_can_update_avatar()
    {
        $user = $this->createUser();

        Storage::fake('avatars');
        $file = UploadedFile::fake()->image('test-image.jpg');

        $body = ['avatar' => $file];

        $this->json('POST', 'api/users/' . $user->id . '/update_avatar', $body, $this->authHeaders($user))
            ->assertStatus(200)
            ->assertJson([
                'avatar' => '/storage/avatars/' . $file->hashName(),
            ]);

        Storage::disk('public')->assertExists('avatars/' . $file->hashName());
        Storage::disk('public')->delete('avatars/' . $file->hashName());
    }

    /**
     * @test
     */
    public function user_can_remove_avatar()
    {
        $user = $this->createUser();

        Storage::fake('avatars');
        $file = UploadedFile::fake()->image('test-image.jpg');

        $body = ['avatar' => $file];

        $this->json('POST', 'api/users/' . $user->id . '/remove_avatar', $body, $this->authHeaders($user))
            ->assertStatus(200)
            ->assertJson([
                'avatar' => null,
            ]);

        // Storage::disk('public')->assert('avatars/' . $file->hashName());
    }

    /**
     * @test
     */
    public function user_can_not_update_other_user()
    {
        $user = $this->createUser();
        $otherUser = factory(User::class)->create();

        $body = ['biography' => 'new bio'];

        $this->json('POST', 'api/users/' . $otherUser->id . '?_method=PUT', $body, $this->authHeaders($user))
            ->assertStatus(401)
            ->assertJson([
                'message' => 'Unauthorized',
            ]);
    }

    /**
     * @test
     */
    public function user_can_not_update_other_users_avatar()
    {
        $user = $this->createUser();
        $otherUser = factory(User::class)->create();

        $this->json('POST', 'api/users/' . $otherUser->id . '/update_avatar', [], $this->authHeaders($user))
            ->assertStatus(401)
            ->assertJson([
                'message' => 'Unauthorized',
            ]);
    }

    /**
     * @test
     */
    public function user_can_not_remove_other_users_avatar()
    {
        $user = $this->createUser();
        $otherUser = factory(User::class)->create();

        $this->json('POST', 'api/users/' . $otherUser->id . '/remove_avatar', [], $this->authHeaders($user))
            ->assertStatus(401)
            ->assertJson([
                'message' => 'Unauthorized',
            ]);
    }

    /**
     * @test
     */
    public function guests_can_not_update_users()
    {
        $user = $this->createUser();
        $otherUser = factory(User::class)->create();

        $this->json('POST', 'api/users/' . $otherUser->id . '?_method=PUT', [], $this->authHeaders($user))
            ->assertStatus(401)
            ->assertJson([
                'message' => 'Unauthorized',
            ]);

        $this->json('POST', 'api/users/' . $otherUser->id . '/update_avatar', [], $this->authHeaders($user))
            ->assertStatus(401)
            ->assertJson([
                'message' => 'Unauthorized',
            ]);

        $this->json('POST', 'api/users/' . $otherUser->id . '/remove_avatar', [], $this->authHeaders($user))
            ->assertStatus(401)
            ->assertJson([
                'message' => 'Unauthorized',
            ]);
    }

}