import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColorHexToCategory1765065211824 implements MigrationInterface {
  name = 'AddColorHexToCategory1765065211824';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "category" ADD "color_hex" character varying(255) NOT NULL DEFAULT '#000000'`,
    );

    //update categories
    await queryRunner.query(
      `UPDATE "category" SET "color_hex" = '#bf801b' WHERE "name" = 'Bydgoszcz jako "Klein Berlin"'`,
    );
    await queryRunner.query(
      `UPDATE "category" SET "color_hex" = '#3f88e0' WHERE "name" = 'Bydgoskie Murale'`,
    );
    await queryRunner.query(
      `UPDATE "category" SET "color_hex" = '#549c73' WHERE "name" = 'Bydgoszcz Turystycznie'`,
    );
    await queryRunner.query(
      `UPDATE "category" SET "color_hex" = '#6e4685' WHERE "name" = 'Dookoła Śródmieścia'`,
    );
    await queryRunner.query(
      `UPDATE "category" SET "color_hex" = '#f0f27e' WHERE "name" = 'Poznaj Stare Miasto'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "color_hex"`);
  }
}

