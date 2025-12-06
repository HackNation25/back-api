import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { randomUUID } from 'node:crypto';

@Entity('poi')
export class PoiEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text' })
  shortDescription: string;

  @Column({ type: 'text' })
  longDescription: string;

  @Column({ type: 'varchar', length: 500 })
  imageUrl: string;

  @Column({ type: 'integer', default: 0 })
  popularity: number;

  @Column({ type: 'decimal', precision: 10, scale: 8 })
  locationX: number;
  @Column({ type: 'decimal', precision: 10, scale: 8 })
  locationY: number;

  static create(
    name: string,
    shortDescription: string,
    longDescription: string,
    imageUrl: string,
    popularity: number,
    locationX: number,
    locationY: number,
  ): PoiEntity {
    return {
      uuid: randomUUID() as string,
      name,
      shortDescription,
      longDescription,
      imageUrl,
      popularity,
      locationX,
      locationY,
    };
  }
}
