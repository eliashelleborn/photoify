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

    /**
     * @test
     */
    public function guest_can_not_refresh_token()
    {
        $this->json('POST', 'api/auth/refresh')
            ->assertStatus(401)
            ->assertJson(["message" => "Unauthenticated."]);
    }

    /**
     * @test
     */
    public function user_can_refresh_token()
    {
        $user = $this->createUser();
        $this->json('POST', 'api/auth/refresh', [], $this->authHeaders($user))
            ->assertStatus(200)
            ->assertJsonStructure([
                'access_token',
                'token_type',
                'expires_in',
            ]);
    }
}
