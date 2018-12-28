<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\DatabaseMigrations;
use Tests\TestCase;

/**
 * @testdox Auth\RefreshToken
 * @group auth
 * @group refreshtoken
 */
class RefreshTokenTest extends TestCase
{
    use DatabaseMigrations;

    /**
     * Logout Tests
     * POST /api/auth/logout
     */

    public function testUnauthenticated()
    {
        $this->json('POST', 'api/auth/refresh')
            ->assertStatus(401)
            ->assertJson(["message" => "Unauthenticated."]);
    }

    public function testRefreshTokenSuccessfully()
    {
        $user = $this->createTestUser();
        $this->json('POST', 'api/auth/refresh', [], $this->authHeaders($user))
            ->assertStatus(200)
            ->assertJsonStructure([
                'access_token',
                'token_type',
                'expires_in',
            ]);
    }
}
