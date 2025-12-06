import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCategoryToPoi1765056392254 implements MigrationInterface {
  name = 'AddCategoryToPoi1765056392254';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "poi" ADD "category_id" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "poi" ADD CONSTRAINT "FK_3523305a5fed9396b3be5271a97" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "poi" DROP CONSTRAINT "FK_3523305a5fed9396b3be5271a97"`,
    );
    await queryRunner.query(`ALTER TABLE "poi" DROP COLUMN "category_id"`);
  }
}
