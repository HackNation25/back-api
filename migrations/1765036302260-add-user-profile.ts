import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserProfile1765036302260 implements MigrationInterface {
  name = 'AddUserProfile1765036302260';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_profile" ("uuid" uuid NOT NULL DEFAULT gen_random_uuid(), "date_created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "choices" jsonb NOT NULL, CONSTRAINT "PK_7e67b53e5bc90017b2836ef1b9b" PRIMARY KEY ("uuid"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user_profile"`);
  }
}
