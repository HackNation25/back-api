import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { randomUUID } from 'node:crypto';
import { PoiEntity } from '../../../poi/infrastructure/persistence/poi.entity';
import { UserProfileEntity } from '../../../user-profile/user-profile.entity';

@Entity('poi_decision')
@Index('uniq_poi_user', ['poi', 'userProfile'], { unique: true })
export class PoiDecisionEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid!: string;

  @ManyToOne(() => PoiEntity, { nullable: false, onDelete: 'DEFAULT' })
  @JoinColumn({ name: 'poi_id', referencedColumnName: 'uuid' })
  poi!: PoiEntity;

  @RelationId((d: PoiDecisionEntity) => d.poi)
  poiId!: string;

  @ManyToOne(() => UserProfileEntity, { nullable: false, onDelete: 'DEFAULT' })
  @JoinColumn({ name: 'user_profile_id', referencedColumnName: 'uuid' })
  userProfile!: UserProfileEntity;

  @RelationId((d: PoiDecisionEntity) => d.userProfile)
  userProfileId!: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @CreateDateColumn({ name: 'modified_at', type: 'timestamptz' })
  modifiedAt!: Date;

  @Column({ type: 'boolean' })
  decision!: boolean;

  static create(
    poiId: string,
    userProfileId: string,
    decision: boolean,
  ): PoiDecisionEntity {
    return {
      uuid: randomUUID() as string,
      poi: { uuid: poiId } as PoiEntity,
      userProfile: { uuid: userProfileId } as UserProfileEntity,
      decision,
      // created_at is automatically set by the database via CreateDateColumn
    } as unknown as PoiDecisionEntity;
  }
}
