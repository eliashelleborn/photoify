<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\DatabaseMigrations;
use Tests\TestCase;

/**
 * @testdox Auth\Login
 * @group auth
 * @group login
 */
class LoginTest extends TestCase
{
    use DatabaseMigrations;

    /**
     * Login Tests
     * POST /api/auth/login
     */

    /**
     * @test
     */
    public function login_requires_email_and_password()
    {
        $this->json('POST', 'api/auth/login')
            ->assertStatus(422)
            ->assertJsonValidationErrors(['email', 'password']);
    }

    /**
     * @test
     */
    public function login_requires_valid_credentials()
    {
        $user = $this->createUser();

        $payload = ['email' => 'wrongemail@test.com', 'password' => 'invalidpassword'];

        $this->json('POST', 'api/auth/login', $payload)
            ->assertStatus(400)
            ->assertJson([
                'message' => 'Invalid credentials',
            ]);
    }

    /**
     * @test
     */
    public function can_login()
    {
        $user = $this->createUser();

        $payload = ['email' => 'test@user.com', 'password' => '123'];

        $this->json('POST', 'api/auth/login', $payload)
            ->assertStatus(200)
            ->assertJsonStructure([
                'access_token',
                'token_type',
                'expires_in',
            ]);
    }
}
