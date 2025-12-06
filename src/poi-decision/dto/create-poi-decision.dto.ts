import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsUUID } from 'class-validator';
import { PoiDecisionEntity } from '../infrastructure/persistence/poi-decision.entity';

export class CreatePoiDecisionDto {
  @ApiProperty({
    description: 'POI UUID',
    example: '11111111-1111-1111-1111-111111111111',
  })
  @IsUUID()
  poiId!: string;

  @ApiProperty({
    description: 'User Profile UUID',
    example: '22222222-2222-2222-2222-222222222222',
  })
  @IsUUID()
  userProfileId!: string;

  @ApiProperty({ description: 'Decision value', example: true })
  @IsBoolean()
  decision!: boolean;

  toEntity(): PoiDecisionEntity {
    return PoiDecisionEntity.create(
      this.poiId,
      this.userProfileId,
      this.decision,
    );
  }
}
