import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl, MaxLength } from 'class-validator';

export class CreateCategoryDto {
  @IsString({ message: 'name must be a string' })
  @MaxLength(255, { message: 'name must be at most 255 characters' })
  @ApiProperty({
    description: 'Human-friendly category name',
    example: 'Sports',
  })
  name!: string;

  @IsString({ message: 'image_url must be a string' })
  @MaxLength(1024, { message: 'image_url must be at most 1024 characters' })
  @IsUrl({}, { message: 'image_url must be a valid URL' })
  @ApiProperty({
    description: 'Publicly accessible URL to the category image',
    example: 'https://picsum.photos/200/300',
  })
  image_url!: string;
}
