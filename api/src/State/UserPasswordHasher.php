<?php
# api/src/State/UserPasswordHasher.php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

final class UserPasswordHasher implements ProcessorInterface
{
    public function __construct(private readonly ProcessorInterface $processor, private readonly UserPasswordHasherInterface $passwordHasher)
    {
    }

    /**
     * @param mixed $data
     * @param Operation $operation
     * @param array<string, mixed> $uriVariables
     * @param array<string, mixed>&array{request: unset|Request, previous_data: unset|mixed, resource_class: unset|string, original_data: unset|mixed} $context
     * @return T
     */
    public function process($data, Operation $operation, array $uriVariables = [], array $context = [])
    {
        if (!$data->getPlainPassword()) {
            return $this->processor->process($data, $operation, $uriVariables, $context);
        }

        $hashedPassword = $this->passwordHasher->hashPassword(
            $data,
            $data->getPlainPassword()
        );
        $data->setPassword($hashedPassword);
        $data->eraseCredentials();

        return $this->processor->process($data, $operation, $uriVariables, $context);
    }
}
