<?php

namespace App\Tests\Api;

use ApiPlatform\Symfony\Bundle\Test\ApiTestCase;

class GroupTest extends ApiTestCase
{
    public function testCreateGroup(): void
    {
        static::createClient()->request('POST', '/api/groups', [
            'json' => [
                "name" => "group1",
                "description" => "This is group 1."
            ],
            'headers' => [
                'Content-Type' => 'application/json'
            ],
        ]);

        $this->assertResponseStatusCodeSame(201);
        $this->assertJsonContains([
            "name" => "group1",
            "description" => "This is group 1."
        ]);
    }
}
