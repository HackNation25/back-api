import { ApiProperty } from '@nestjs/swagger';
import { PoiDecisionEntity } from '../infrastructure/persistence/poi-decision.entity';

export class PoiDecisionResponseDto {
  @ApiProperty({ description: 'Decision UUID' })
  uuid!: string;

  @ApiProperty({ description: 'POI UUID' })
  poiId!: string;

  @ApiProperty({ description: 'User Profile UUID' })
  userProfileId!: string;

  @ApiProperty({ description: 'Creation timestamp' })
  createAt!: Date;

  @ApiProperty({ description: 'Last modified timestamp' })
  modifiedAt!: Date;

  @ApiProperty({ description: 'Decision value' })
  decision!: boolean;

  static fromEntity(entity: PoiDecisionEntity): PoiDecisionResponseDto {
    return {
      uuid: entity.uuid,
      poiId: entity.poiId,
      userProfileId: entity.userProfileId,
      createAt: entity.createdAt,
      modifiedAt: entity.modifiedAt,
      decision: entity.decision,
    } as PoiDecisionResponseDto;
  }
}
