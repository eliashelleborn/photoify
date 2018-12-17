<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\DatabaseMigrations;
use Tests\TestCase;

class LoginTest extends TestCase
{
    use DatabaseMigrations;

    /**
     * Login Tests
     * POST /api/auth/login
     */
    public function testRequiresEmailAndPassword()
    {
        $this->json('POST', 'api/auth/login')
            ->assertStatus(401)
            ->assertJson([
                'error' => 'Unauthorized',
            ]);
    }

    public function testLoginSuccessfully()
    {
        $user = $this->createTestUser();

        $payload = ['email' => 'test@user.com', 'password' => '123'];

        $this->json('POST', 'api/auth/login', $payload)
            ->assertStatus(200)
            ->assertJsonStructure([
                'access_token',
                'token_type',
                'expires_in',
            ]);

        $user->delete();
    }
}
