<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\GroupRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: GroupRepository::class)]
#[ORM\Table(name: '`group`')]
#[ApiResource]
class Group
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $groupName = null;

    #[ORM\OneToMany(mappedBy: 'groupId', targetEntity: GroupMembers::class, orphanRemoval: true)]
    private Collection $groupMembers;

    public function __construct()
    {
        $this->groupMembers = new ArrayCollection();
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
     * @return Collection<int, GroupMembers>
     */
    public function getGroupMembers(): Collection
    {
        return $this->groupMembers;
    }

    public function addGroupMember(GroupMembers $groupMember): static
    {
        if (!$this->groupMembers->contains($groupMember)) {
            $this->groupMembers->add($groupMember);
            $groupMember->setGroupId($this);
        }

        return $this;
    }

    public function removeGroupMember(GroupMembers $groupMember): static
    {
        if ($this->groupMembers->removeElement($groupMember)) {
            // set the owning side to null (unless already changed)
            if ($groupMember->getGroupId() === $this) {
                $groupMember->setGroupId(null);
            }
        }

        return $this;
    }
}
