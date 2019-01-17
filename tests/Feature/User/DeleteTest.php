<?php

namespace Tests\Feature;

use App\User;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Tests\TestCase;

/**
 * @testdox User\Delete
 * @group user
 * @group user-delete
 */
class UserDeleteTest extends TestCase
{
    use DatabaseMigrations;

    /**
     * @test
     */
    public function user_can_delete_self()
    {
        $user = $this->createUser();

        $this->json('POST', 'api/users/' . $user->id . '?_method=DELETE', ['force_delete' => true], $this->authHeaders($user))
            ->assertStatus(200)
            ->assertJson([
                'message' => 'Successfully deleted user', 'force_delete' => true,
            ]);

        $this->assertDatabaseMissing('users', ['id' => $user->id]);
    }

    /**
     * @test
     */
    public function user_can_not_delete_other_user()
    {
        $user = $this->createUser();
        $otherUser = factory(User::class)->create();

        $this->json('POST', 'api/users/' . $otherUser->id . '?_method=DELETE', ['force_delete' => true], $this->authHeaders($user))
            ->assertStatus(401)
            ->assertJson([
                'message' => 'Unauthorized',
            ]);

        $this->assertDatabaseHas('users', ['id' => $otherUser->id]);
    }

    /**
     * @test
     */
    public function guest_can_not_delete_users()
    {
        $otherUser = factory(User::class)->create();

        $this->json('POST', 'api/users/' . $otherUser->id . '?_method=DELETE', ['force_delete' => true])
            ->assertStatus(401)
            ->assertJson([
                'message' => 'Unauthenticated.',
            ]);

        $this->assertDatabaseHas('users', ['id' => $otherUser->id]);
    }
}