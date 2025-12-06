import { ApiProperty } from '@nestjs/swagger';
import { PoiEntity } from '../infrastructure/persistence/poi.entity';

export class PoiResponseDto {
  @ApiProperty({
    description: 'Unique identifier',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  uuid: string;

  @ApiProperty({
    description: 'Name of the POI',
    example: 'Historic City Center',
  })
  name: string;

  @ApiProperty({
    description: 'Short description of the POI',
    example: 'Beautiful historic center with medieval architecture',
  })
  shortDescription: string;

  @ApiProperty({
    description: 'Long description of the POI',
    example:
      'The historic city center features well-preserved medieval architecture...',
  })
  longDescription: string;

  @ApiProperty({
    description: 'URL to the image of the POI',
    example: 'https://example.com/images/poi.jpg',
  })
  imageUrl: string;

  @ApiProperty({
    description: 'Popularity score (0-100)',
    example: 85,
  })
  popularity: number;

  @ApiProperty({ description: 'X coordinate (longitude)', example: 18.0 })
  locationX: number;

  @ApiProperty({ description: 'Y coordinate (latitude)', example: 53.0 })
  locationY: number;

  static fromEntity(poi: PoiEntity): PoiResponseDto {
    return {
      uuid: poi.uuid,
      name: poi.name,
      shortDescription: poi.shortDescription,
      longDescription: poi.longDescription,
      imageUrl: poi.imageUrl,
      popularity: poi.popularity,
      locationX: poi.locationX,
      locationY: poi.locationY,
    };
  }
}
