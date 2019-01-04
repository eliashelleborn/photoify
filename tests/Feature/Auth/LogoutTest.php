<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\DatabaseMigrations;
use Tests\TestCase;

/**
 * @testdox Auth\Logout
 * @group auth
 * @group logout
 */
class LogoutTest extends TestCase
{
    use DatabaseMigrations;

    /**
     * Logout Tests
     * POST /api/auth/logout
     */

    /**
     * @test
     */
    public function guest_can_not_logout()
    {
        $this->json('POST', 'api/auth/logout')
            ->assertStatus(401)
            ->assertJson(["message" => "Unauthenticated."]);
    }

    /**
     * @test
     */
    public function user_can_logout()
    {
        $user = $this->createUser();
        $this->json('POST', 'api/auth/logout', [], $this->authHeaders($user))
            ->assertStatus(200)
            ->assertJson(["message" => "Successfully logged out"]);
    }
}
