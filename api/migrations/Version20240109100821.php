<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240109100821 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE meet_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE meet (id INT NOT NULL, name VARCHAR(255) NOT NULL, description VARCHAR(255) DEFAULT NULL, address VARCHAR(255) NOT NULL, datetime TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE meet_user (meet_id INT NOT NULL, user_id INT NOT NULL, PRIMARY KEY(meet_id, user_id))');
        $this->addSql('CREATE INDEX IDX_8C87A1583BBBF66 ON meet_user (meet_id)');
        $this->addSql('CREATE INDEX IDX_8C87A158A76ED395 ON meet_user (user_id)');
        $this->addSql('ALTER TABLE meet_user ADD CONSTRAINT FK_8C87A1583BBBF66 FOREIGN KEY (meet_id) REFERENCES meet (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE meet_user ADD CONSTRAINT FK_8C87A158A76ED395 FOREIGN KEY (user_id) REFERENCES "user" (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE meet_id_seq CASCADE');
        $this->addSql('ALTER TABLE meet_user DROP CONSTRAINT FK_8C87A1583BBBF66');
        $this->addSql('ALTER TABLE meet_user DROP CONSTRAINT FK_8C87A158A76ED395');
        $this->addSql('DROP TABLE meet');
        $this->addSql('DROP TABLE meet_user');
    }
}
