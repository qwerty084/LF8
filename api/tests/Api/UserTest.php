<?php

namespace App\Tests\Api;

use ApiPlatform\Symfony\Bundle\Test\ApiTestCase;

class UserTest extends ApiTestCase
{
    public $userId;

    public function testCreateUser(): void
    {
        $response = static::createClient()->request('POST', '/api/users', [
            'json' => [
                "email" => "user12345@example.com",
                "username" => "string",
                "password" => "string"
            ],
            'headers' => [
                'Content-Type' => 'application/json',
                'Accept' => 'application/json'
            ],
        ]);

        $this->userId = $response->toArray()["id"];

        $this->assertResponseStatusCodeSame(201);
        $this->assertJsonContains([
            "email" => "user12345@example.com",
            "username" => "string"
        ]);
    }
    
    public function testDeleteUser(): void
    {
        $response = static::createClient()->request('POST', '/api/users', [
            'json' => [
                "email" => "user12345@example.com",
                "username" => "string",
                "password" => "string"
            ],
            'headers' => [
                'Content-Type' => 'application/json',
                'Accept' => 'application/json'
            ],
        ]);

        $this->userId = $response->toArray()["id"];

        static::createClient()->request('DELETE', "/api/users/" . $this->userId);
        $this->assertResponseStatusCodeSame(204);
    }
}
