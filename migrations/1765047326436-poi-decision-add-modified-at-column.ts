import { MigrationInterface, QueryRunner } from 'typeorm';

export class PoiDecisionAddModifiedAtColumn1765047326436 implements MigrationInterface {
  name = 'PoiDecisionAddModifiedAtColumn1765047326436';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "poi_decision" DROP CONSTRAINT "FK_642fe87b5d06cfa6fa4a93123ba"`,
    );
    await queryRunner.query(
      `ALTER TABLE "poi_decision" DROP CONSTRAINT "FK_6cca974aeaf7cc0fc63c9f37fef"`,
    );
    await queryRunner.query(
      `ALTER TABLE "poi_decision" DROP COLUMN "create_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "poi_decision" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "poi_decision" ADD "modified_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "poi_decision" ADD CONSTRAINT "FK_642fe87b5d06cfa6fa4a93123ba" FOREIGN KEY ("poi_id") REFERENCES "poi"("uuid") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "poi_decision" ADD CONSTRAINT "FK_6cca974aeaf7cc0fc63c9f37fef" FOREIGN KEY ("user_profile_id") REFERENCES "user_profile"("uuid") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "poi_decision" DROP CONSTRAINT "FK_6cca974aeaf7cc0fc63c9f37fef"`,
    );
    await queryRunner.query(
      `ALTER TABLE "poi_decision" DROP CONSTRAINT "FK_642fe87b5d06cfa6fa4a93123ba"`,
    );
    await queryRunner.query(
      `ALTER TABLE "poi_decision" DROP COLUMN "modified_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "poi_decision" DROP COLUMN "created_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "poi_decision" ADD "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "poi_decision" ADD CONSTRAINT "FK_6cca974aeaf7cc0fc63c9f37fef" FOREIGN KEY ("user_profile_id") REFERENCES "user_profile"("uuid") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "poi_decision" ADD CONSTRAINT "FK_642fe87b5d06cfa6fa4a93123ba" FOREIGN KEY ("poi_id") REFERENCES "poi"("uuid") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
  }
}
