<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\GroupRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Annotation\SerializedName;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Link;
use ApiPlatform\Metadata\ApiProperty;


#[ORM\Entity(repositoryClass: GroupRepository::class)]
#[ORM\Table(name: '`group`')]
#[ApiResource(
    normalizationContext: ['groups' => ['group']],
    denormalizationContext: ['groups' => ['group:create', 'group:update', 'group:write']],
)]
#[ApiResource(
    uriTemplate: "/groups/{userId}/users",
    uriVariables: [
        'userId' => new Link(fromClass: User::class, toProperty: 'users'),
    ],
    operations: [new GetCollection()],
    normalizationContext: ['groups' => ['group']],
    denormalizationContext: ['groups' => ['group:create', 'group:update', 'group:write']]
)]
class Group
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['group', 'group:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['group', 'group:create', 'group:write', 'group:update', 'group:read'])]
    #[SerializedName("name")]
    private ?string $groupName = null;

    #[ORM\ManyToMany(targetEntity: User::class, mappedBy: 'groups')]
    #[Groups(['group', 'group:create', 'group:write', 'group:update', 'group:read'])]
    #[SerializedName('members')]
    private Collection $users;

    #[ORM\OneToOne(targetEntity: MediaObject::class, cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: true)]
    #[ApiProperty(types: ['https://schema.org/image'])]
    #[Groups(['group', 'group:create', 'group:write', 'group:update'])]
    private ?MediaObject $avatar = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['group', 'group:create', 'group:write', 'group:update', 'group:read'])]
    private ?string $description = null;
    
    #[ORM\Column]
    #[Groups(['group', 'group:create', 'group:write', 'group:update', 'group:read'])]
    private ?bool $isGroupChat = null;

    public function __construct()
    {
        $this->users = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getGroupName(): ?string
    {
        return $this->groupName;
    }

    public function setGroupName(string $groupName): static
    {
        $this->groupName = $groupName;

        return $this;
    }

    /**
     * @return Collection<int, User>
     */
    public function getUsers(): Collection
    {
        return $this->users;
    }

    public function addUser(User $user): static
    {
        if (!$this->users->contains($user)) {
            $this->users->add($user);
            $user->addGroup($this);
        }

        return $this;
    }

    public function removeUser(User $user): static
    {
        if ($this->users->removeElement($user)) {
            $user->removeGroup($this);
        }

        return $this;
    }

    public function getAvatar(): ?MediaObject
    {
        return $this->avatar;
    }

    #[Groups(['group', 'group:read'])]
    #[SerializedName('avatar')]
    public function getAvatarPath(): ?string
    {
        return $this->avatar?->getFilePath();
    }

    public function setAvatar(?MediaObject $avatar): static
    {
        $this->avatar = $avatar;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function isIsGroupChat(): ?bool
    {
        return $this->isGroupChat;
    }

    public function setIsGroupChat(bool $isGroupChat): static
    {
        $this->isGroupChat = $isGroupChat;

        return $this;
    }
}
