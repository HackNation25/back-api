import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user_profile')
export class UserProfileEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid!: string;

  @CreateDateColumn({ name: 'date_created', type: 'timestamptz' })
  date_created!: Date;

  @Column({ type: 'jsonb' })
  choices!: any[];
}
