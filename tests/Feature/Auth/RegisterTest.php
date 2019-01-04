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

    /**
     * @test
     */
    public function register_required_fields()
    {
        $this->json('POST', 'api/auth/register')
            ->assertStatus(422)
            ->assertJsonValidationErrors(['username', 'name', 'email', 'password']);
    }

    /**
     * @test
     */
    public function register_requires_unique_email_and_username()
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
            ->assertJsonMissingValidationErrors(['username', 'name', 'password'])
            ->assertJsonValidationErrors('email');

        $userData['email'] = 'nottaken@test.com';
        $userData['username'] = 'TestUser';

        $this->json('POST', 'api/auth/register', $userData)
            ->assertStatus(422)
            ->assertJsonMissingValidationErrors(['email', 'name', 'password'])
            ->assertJsonValidationErrors('username');
    }

    /**
     * @test
     */
    public function register_requires_username_with_max_length_32()
    {
        $userData = [
            'email' => 'testregister@test.com',
            'username' => 'ThisIsAVeryLongUsernameThatShouldCauseAnError',
            'name' => 'Test Register',
            'password' => '123',
        ];

        $this->json('POST', 'api/auth/register', $userData)
            ->assertStatus(422)
            ->assertJsonMissingValidationErrors(['email', 'name', 'password'])
            ->assertJsonValidationErrors('username');
    }

    /**
     * @test
     */
    public function register_requires_username_with_min_length_5()
    {
        $userData = [
            'email' => 'testregister@test.com',
            'username' => 'bla',
            'name' => 'Test Register',
            'password' => '123',
        ];

        $this->json('POST', 'api/auth/register', $userData)
            ->assertStatus(422)
            ->assertJsonMissingValidationErrors(['email', 'name', 'password'])
            ->assertJsonValidationErrors('username');
    }

    /**
     * @test
     */
    public function can_register()
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
