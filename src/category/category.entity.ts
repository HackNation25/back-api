import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('category')
export class CategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Column({ name: 'color_hex', type: 'varchar', length: 255 })
  colorHex!: string;

  @Column({ name: 'image_url', type: 'varchar', length: 1024 })
  image_url!: string;
}
