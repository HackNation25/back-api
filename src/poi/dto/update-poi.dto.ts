import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsUrl,
  Min,
  Max,
  IsOptional,
} from 'class-validator';
import { PoiEntity } from '../infrastructure/persistence/poi.entity';

export class UpdatePoiDto {
  @ApiPropertyOptional({
    description: 'Name of the POI',
    example: 'Historic City Center',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    description: 'Short description of the POI',
    example: 'Beautiful historic center with medieval architecture',
  })
  @IsString()
  @IsOptional()
  shortDescription?: string;

  @ApiPropertyOptional({
    description: 'Long description of the POI',
    example:
      'The historic city center features well-preserved medieval architecture...',
  })
  @IsString()
  @IsOptional()
  longDescription?: string;

  @ApiPropertyOptional({
    description: 'URL to the image of the POI',
    example: 'https://example.com/images/poi.jpg',
  })
  @IsUrl()
  @IsOptional()
  imageUrl?: string;

  @ApiPropertyOptional({
    description: 'Popularity score (0-100)',
    example: 85,
    minimum: 0,
    maximum: 100,
  })
  @IsNumber()
  @Min(0)
  @Max(100)
  @IsOptional()
  popularity?: number;

  @ApiPropertyOptional({
    description: 'Location coordinates (x, y)',
    example: 18.0,
  })
  @IsNumber()
  @IsOptional()
  locationX?: number;
  @ApiPropertyOptional({
    description: 'Y coordinate (latitude)',
    example: 53.0,
  })
  @IsNumber()
  @IsOptional()
  locationY?: number;

  toEntity(): Partial<PoiEntity> {
    const entity: Partial<PoiEntity> = {
      name: this.name,
      shortDescription: this.shortDescription,
      longDescription: this.longDescription,
      imageUrl: this.imageUrl,
      popularity: this.popularity,
      locationX: this.locationX,
      locationY: this.locationY,
    };
    return entity;
  }
}
