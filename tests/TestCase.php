<?php

namespace Tests;

use App\User;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Tymon\JWTAuth\Facades\JWTAuth;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication;

    protected function createTestUser(): object
    {
        $user = factory(User::class)->create([
            'email' => 'test@user.com',
            'password' => '123',
        ]);
        return $user;
    }

    protected function authHeaders($user = null): array
    {
        if (!is_null($user)) {
            $token = JWTAuth::fromUser($user);
            $headers['Authorization'] = 'Bearer ' . $token;
        }
        return $headers;
    }
}
