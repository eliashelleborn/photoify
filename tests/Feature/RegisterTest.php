<?php

namespace Tests\Feature;

use App\User;
use Tests\TestCase;

class RegisterTest extends TestCase
{
    /**
     * Register Tests
     * POST /api/auth/Register
     */

    public function testFieldsRequired()
    {
        $this->json('POST', 'api/auth/register')
            ->assertStatus(422)
            ->assertJson([
                "message" => "The given data was invalid.",
                "errors" => [
                    "name" => [
                        "The name field is required.",
                    ],
                    "email" => [
                        "The email field is required.",
                    ],
                    "password" => [
                        "The password field is required.",
                    ],
                ],
            ]);
    }

    public function testEmailHasAlreadyBeenTaken()
    {

        $userData = [
            'email' => 'testregister@test.com',
            'name' => 'Test Register',
            'password' => '123',
        ];

        $user = factory(User::class)->create($userData);

        $this->json('POST', 'api/auth/register', $userData)
            ->assertStatus(422)
            ->assertJson([
                "message" => "The given data was invalid.",
                "errors" => [
                    "email" => [
                        "The email has already been taken.",
                    ],
                ],
            ]);

        $user->delete();

    }

    public function testRegisterSuccessfully()
    {
        $userData = [
            'email' => 'testregister@test.com',
            'name' => 'Test Register',
            'password' => '123',
        ];

        $response = $this->json('POST', 'api/auth/register', $userData)
            ->assertStatus(200)
            ->assertJsonStructure([
                'access_token',
                'token_type',
                'expires_in',
            ]);

        $user = User::where('email', 'testregister@test.com');
        $user->delete();
    }
}
