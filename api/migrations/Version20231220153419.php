<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231220153419 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP SEQUENCE group_members_id_seq CASCADE');
        $this->addSql('ALTER TABLE group_members DROP CONSTRAINT fk_c3a086f32f68b530');
        $this->addSql('ALTER TABLE group_members DROP CONSTRAINT fk_c3a086f39d86650f');
        $this->addSql('DROP TABLE group_members');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('CREATE SEQUENCE group_members_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE group_members (id INT NOT NULL, group_id_id INT NOT NULL, user_id_id INT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX idx_c3a086f39d86650f ON group_members (user_id_id)');
        $this->addSql('CREATE INDEX idx_c3a086f32f68b530 ON group_members (group_id_id)');
        $this->addSql('ALTER TABLE group_members ADD CONSTRAINT fk_c3a086f32f68b530 FOREIGN KEY (group_id_id) REFERENCES "group" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE group_members ADD CONSTRAINT fk_c3a086f39d86650f FOREIGN KEY (user_id_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }
}
