<?php

namespace App\Story;

use App\Factory\GroupFactory;
use Zenstruck\Foundry\Story;

final class DefaultGroupsStory extends Story
{
    public function build(): void
    {
        GroupFactory::createMany(20);
    }
}
