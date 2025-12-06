import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsUUID } from 'class-validator';
import { PoiDecisionEntity } from '../infrastructure/persistence/poi-decision.entity';

export class CreatePoiDecisionDto {
  @ApiProperty({
    description: 'POI UUID',
    example: '94e1e0db-294e-4109-b11c-9e33d3fd6174',
  })
  @IsUUID()
  poiId!: string;

  @ApiProperty({
    description: 'User Profile UUID',
    example: 'a3def291-1cda-4cdc-ba1a-8b0d121be858',
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
