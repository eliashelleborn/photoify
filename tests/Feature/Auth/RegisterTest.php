<?php

namespace Tests\Feature;

use App\User;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Tests\TestCase;

/**
 * @testdox Auth\Register
 * @group auth
 * @group register
 */
class RegisterTest extends TestCase
{
    use DatabaseMigrations;

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

    public function testEmailOrUsernameHasAlreadyBeenTaken()
    {

        $userData = [
            'email' => 'testregister@test.com',
            'username' => 'TestUser',
            'name' => 'Test Register',
            'password' => '123',
        ];

        $user = factory(User::class)->create($userData);

        $userData['username'] = 'NotTaken';

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

        $userData['username'] = 'TestUser';

        $this->json('POST', 'api/auth/register', $userData)
            ->assertStatus(422)
            ->assertJson([
                "message" => "The given data was invalid.",
                "errors" => [
                    "username" => [
                        "The username has already been taken.",
                    ],
                ],
            ]);
    }

    public function testUsernameTooLong()
    {
        $userData = [
            'email' => 'testregister@test.com',
            'username' => 'ThisIsAVeryLongUsernameThatShouldCauseAnError',
            'name' => 'Test Register',
            'password' => '123',
        ];

        $this->json('POST', 'api/auth/register', $userData)
            ->assertStatus(422)
            ->assertJson([
                "message" => "The given data was invalid.",
                "errors" => [
                    "username" => [
                        "The username may not be greater than 32 characters.",
                    ],
                ],
            ]);
    }

    public function testUsernameTooShort()
    {
        $userData = [
            'email' => 'testregister@test.com',
            'username' => 'bla',
            'name' => 'Test Register',
            'password' => '123',
        ];

        $this->json('POST', 'api/auth/register', $userData)
            ->assertStatus(422)
            ->assertJson([
                "message" => "The given data was invalid.",
                "errors" => [
                    "username" => [
                        "The username must be at least 5 characters.",
                    ],
                ],
            ]);
    }

    public function testRegisterSuccessfully()
    {
        $userData = [
            'email' => 'testregister@test.com',
            'username' => 'TestUser',
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
    }
}
