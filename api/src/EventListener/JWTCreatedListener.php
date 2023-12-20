<?php

namespace App\EventListener;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\Security\Core\User\UserInterface;

class JWTCreatedListener
{
    private RequestStack $requestStack;

    public function __construct(RequestStack $requestStack)
    {
        $this->requestStack = $requestStack;
    }

    public function onJWTCreated(JWTCreatedEvent $event): void
    {
        $request = $this->requestStack->getCurrentRequest();
        $user = $event->getUser();

        if (!$user instanceof UserInterface) {
            return;
        }

        /** @var User $user */
        $payload["user"] = [
            "id" => $user->getId(),
            "username" => $user->getUsername(),
            "email" => $user->getEmail(),
            "status" => $user->getStatus(),
            "bio" => $user->getBio(),
            "ip" => $request->getClientIp(),
        ];

        $event->setData($payload);
    }
}
