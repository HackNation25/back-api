import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePoiTable1765043702529 implements MigrationInterface {

  name = 'CreatePoiTable1765043702529';
  public async up(queryRunner: QueryRunner): Promise<void> {
    
    await queryRunner.createTable(
      new Table({
        name: 'poi',
        columns: [
          {
            name: 'uuid',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'gen_random_uuid()',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'shortDescription',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'longDescription',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'imageUrl',
            type: 'varchar',
            length: '500',
            isNullable: false,
          },
          {
            name: 'popularity',
            type: 'integer',
            default: 0,
            isNullable: false,
          },
          {
            name: 'locationX',
            type: 'decimal',
            precision: 10,
            scale: 8,
            isNullable: false,
          },
          {
            name: 'locationY',
            type: 'decimal',
            precision: 10,
            scale: 8,
            isNullable: false,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('poi', true);
  }
}

