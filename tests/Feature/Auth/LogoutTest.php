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

    public function testUnauthenticated()
    {
        $this->json('POST', 'api/auth/logout')
            ->assertStatus(401)
            ->assertJson(["message" => "Unauthenticated."]);
    }

    public function testLogoutSuccessfully()
    {
        $user = $this->createTestUser();
        $this->json('POST', 'api/auth/logout', [], $this->authHeaders($user))
            ->assertStatus(200)
            ->assertJson(["message" => "Successfully logged out"]);
    }
}
