<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\MessageRepository;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Link;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Annotation\SerializedName;

#[ORM\Entity(repositoryClass: MessageRepository::class)]
#[ApiResource]
#[ApiResource(
    uriTemplate: "/messages/{groupId}/groups",
    uriVariables: [
        'groupId' => new Link(fromClass: Group::class, toProperty: 'chatGroup'),
    ],
    operations: [ new GetCollection() ],
    normalizationContext: ['groups' => ['message']],
    denormalizationContext: ['groups' => ['message:create', 'message:update', 'message:write']]
)]
class Message
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'messages')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Group $chatGroup = null;

    #[ORM\Column(length: 255)]
    #[Groups(['message', 'message:create', 'message:write', 'message:update', 'message:read'])]
    private ?string $message = null;

    #[ORM\Column]
    #[Groups(['message', 'message:create', 'message:write', 'message:update', 'message:read'])]
    private ?\DateTimeImmutable $createdAt = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $sender = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getChatGroup(): ?Group
    {
        return $this->chatGroup;
    }

    public function setChatGroup(?Group $chatGroup): static
    {
        $this->chatGroup = $chatGroup;

        return $this;
    }

    public function getMessage(): ?string
    {
        return $this->message;
    }

    public function setMessage(string $message): static
    {
        $this->message = $message;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): static
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getSender(): ?User
    {
        return $this->sender;
    }

    public function setSender(?User $sender): static
    {
        $this->sender = $sender;

        return $this;
    }

    #[Groups(['message', 'message:create', 'message:write', 'message:update', 'message:read'])]
    #[SerializedName('senderId')]
    public function getSenderId(): ?int
    {
        return $this->sender?->getId();
    }
}
