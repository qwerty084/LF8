<?php

namespace App\Tests\Api;

use ApiPlatform\Symfony\Bundle\Test\ApiTestCase;
use Exception;

class UserTest extends ApiTestCase
{
    public function testCreateUser(): void
    {
        static::createClient()->request('POST', '/api/users', [
            'json' => [
                "email" => "user12345@example.com",
                "username" => "string",
                "password" => "string"
            ],
            'headers' => [
                'Content-Type' => 'application/json'
            ],
        ]);

        $this->assertResponseStatusCodeSame(201);
        $this->assertJsonContains([
            "email" => "user12345@example.com",
            "username" => "string"
        ]);

        if ($this->assertJsonContains("password")) {
            throw new Exception("Password in response");
        }
    }
}
