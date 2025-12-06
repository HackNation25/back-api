import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserProfile1765044702529 implements MigrationInterface {
  name = 'AddUserProfile1765044702529';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "poi_decision" ("uuid" uuid NOT NULL DEFAULT gen_random_uuid(), "poi_id" uuid NOT NULL, "user_profile_id" uuid NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "decision" boolean NOT NULL, CONSTRAINT "PK_55f1534d4beb1ce3a5ed46c1d93" PRIMARY KEY ("uuid"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "uniq_poi_user" ON "poi_decision" ("poi_id", "user_profile_id") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."uniq_poi_user"`);
    await queryRunner.query(`DROP TABLE "poi_decision"`);
  }
}
