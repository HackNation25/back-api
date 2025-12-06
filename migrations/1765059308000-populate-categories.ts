import { MigrationInterface, QueryRunner } from 'typeorm';

export class PopulateCategories1765059308000 implements MigrationInterface {

  name = 'PopulateCategories1765059308000';
  
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO "category" ("name", "image_url") VALUES
      ('Bydgoszcz jako "Klein Berlin"', 'https://plum-defeated-urial-464.mypinata.cloud/ipfs/bafybeidwawynzug3kg6z7k63qthskn26datjhovmo7ggbvlgcu73ngmr3u/bydgoszcz-jako-klein.jpg'),
      ('Bydgoskie Murale', 'https://plum-defeated-urial-464.mypinata.cloud/ipfs/bafybeidwawynzug3kg6z7k63qthskn26datjhovmo7ggbvlgcu73ngmr3u/bydgoskie%20murale.jpg'),
      ('Bydgoszcz Turystycznie', 'https://plum-defeated-urial-464.mypinata.cloud/ipfs/bafybeidwawynzug3kg6z7k63qthskn26datjhovmo7ggbvlgcu73ngmr3u/bydgoszcz-turystycznie.jpg'),
      ('Dookoła Śródmieścia', 'https://plum-defeated-urial-464.mypinata.cloud/ipfs/bafybeidwawynzug3kg6z7k63qthskn26datjhovmo7ggbvlgcu73ngmr3u/dookola-srodmiescia.jpg'),
      ('Poznaj Stare Miasto', 'https://plum-defeated-urial-464.mypinata.cloud/ipfs/bafybeidwawynzug3kg6z7k63qthskn26datjhovmo7ggbvlgcu73ngmr3u/poznaj-stare-miasto.jpg')
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM "category" 
      WHERE "name" IN (
        'Bydgoszcz jako "Klein Berlin"',
        'Bydgoskie Murale',
        'Bydgoszcz Turystycznie',
        'Dookoła Śródmieścia',
        'Poznaj Stare Miasto'
      )
    `);
  }
}

