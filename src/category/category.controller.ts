import {
  Body,
  Controller,
  Get,
  Inject,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CategoryEntity } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(
    @Inject("ICategoryService")
    private readonly categoryService: CategoryService
  ) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get a category by id' })
  @ApiParam({
    name: 'id',
    description: 'Category ID (UUID)',
    example: '8a49f1b5-9a42-4a1f-9c8e-3f6f5c9f1a2b',
  })
  @ApiOkResponse({ description: 'Category found', type: CategoryEntity })
  async getById(@Param('id') id: string): Promise<CategoryEntity> {
    const category = await this.categoryService.getById(id);
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  @Post()
  @ApiOperation({ summary: 'Create a new category' })
  @ApiBody({
    description: 'Payload for creating a category',
    type: CreateCategoryDto,
    examples: {
      default: {
        summary: 'Simple example',
        value: {
          name: 'Sports',
          image_url: 'https://cdn.example.com/images/categories/sports.png',
        },
      },
    },
  })
  @ApiCreatedResponse({ description: 'Category created', type: CategoryEntity })
  @ApiBadRequestResponse({ description: 'Validation error' })
  async create(@Body() dto: CreateCategoryDto): Promise<CategoryEntity> {
    return this.categoryService.create(dto.name, dto.image_url);
  }
}
