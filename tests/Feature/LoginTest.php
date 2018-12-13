<?php

namespace Tests\Feature;

use App\User;
use Tests\TestCase;

class LoginTest extends TestCase
{
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
        $user = factory(User::class)->create([
            'email' => 'testlogin@user.com',
            'password' => '123',
        ]);

        $payload = ['email' => 'testlogin@user.com', 'password' => '123'];

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
