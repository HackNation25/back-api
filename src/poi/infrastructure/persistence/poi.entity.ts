import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { randomUUID } from 'node:crypto';
import { CategoryEntity } from '../../../category/category.entity';

@Entity('poi')
export class PoiEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ManyToOne(() => CategoryEntity, { nullable: false, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'category_id', referencedColumnName: 'id' })
  category: CategoryEntity;

  @RelationId((d: PoiEntity) => d.category)
  categoryId: string;

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
    categoryId: string,
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
      category: { id: categoryId } as CategoryEntity,
      longDescription,
      imageUrl,
      popularity,
      locationX,
      locationY,
    } as unknown as PoiEntity;
  }
}
