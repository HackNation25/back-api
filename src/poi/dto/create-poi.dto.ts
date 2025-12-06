import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsUrl, Min, Max } from 'class-validator';
import { PoiEntity } from '../infrastructure/persistence/poi.entity';

export class CreatePoiDto {
  @ApiProperty({ description: 'Name of the POI', example: 'Historic City Center' })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Short description of the POI',
    example: 'Beautiful historic center with medieval architecture',
  })
  @IsString()
  shortDescription: string;

  @ApiProperty({
    description: 'Long description of the POI',
    example: 'The historic city center features well-preserved medieval architecture, cobblestone streets, and numerous cultural landmarks dating back to the 14th century.',
  })
  @IsString()
  longDescription: string;

  @ApiProperty({
    description: 'URL to the image of the POI',
    example: 'https://example.com/images/poi.jpg',
  })
  @IsUrl()
  imageUrl: string;

  @ApiProperty({
    description: 'Popularity score (0-100)',
    example: 85,
    minimum: 0,
    maximum: 100,
  })
  @IsNumber()
  @Min(0)
  @Max(100)
  popularity: number;

  @ApiProperty({
    description: 'Location coordinates (x, y)',
    example: 18.0,
  })
  @IsNumber()
  locationX: number;

  @ApiProperty({ description: 'Y coordinate (latitude)', example: 53.0 })
  @IsNumber()
  locationY: number;

  toEntity(): PoiEntity {
    const entity: PoiEntity = PoiEntity.create(
      this.name,
      this.shortDescription,
      this.longDescription,
      this.imageUrl,
      this.popularity,
      this.locationX,
      this.locationY
    );
    return entity;
  }
}