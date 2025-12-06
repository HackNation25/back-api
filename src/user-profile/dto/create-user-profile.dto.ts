import {
  IsArray,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class ChoiceDto {
  @IsUUID('4', { message: 'category_id must be a valid UUID v4' })
  @ApiPropertyOptional({
    description: 'Category identifier as UUID',
    example: '8a49f1b5-9a42-4a1f-9c8e-3f6f5c9f1a2b',
  })
  category_id!: string;

  @IsString({ message: 'choice must be a string' })
  @ApiPropertyOptional({
    description: 'Choice code as string',
    example: '1',
  })
  choice!: string;
}

export class CreateUserProfileDto {
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ChoiceDto)
  @ApiPropertyOptional({
    description: 'User choices payload as an array of choices',
    required: false,
    type: () => ChoiceDto,
    isArray: true,
    example: [
      {
        category_id: '8a49f1b5-9a42-4a1f-9c8e-3f6f5c9f1a2b',
        choice: '1',
      },
      {
        category_id: '3c2a7f12-5d3e-4b9a-8e6f-2b1c9d8f7a6e',
        choice: '2',
      },
    ],
  })
  choices?: ChoiceDto[];
}
