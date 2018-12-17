<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\DatabaseMigrations;
use Tests\TestCase;

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
            ->assertJson(["message" => "Unauthenticated."]);
    }

    public function testLogoutSuccessfully()
    {
        $user = $this->createTestUser();
        $this->json('POST', 'api/auth/logout', [], $this->authHeaders($user))
            ->assertJson(["message" => "Successfully logged out"]);
    }
}
