import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from './category.entity';
import { ICategoryService } from './application/interfaces/category.service.interface';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService implements ICategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly repo: Repository<CategoryEntity>,
  ) {}

  async getAll(): Promise<CategoryEntity[]> {
    return this.repo.find();
  }

  async getById(id: string): Promise<CategoryEntity | null> {
    return this.repo.findOne({ where: { id } });
  }

  async create(dto: CreateCategoryDto): Promise<CategoryEntity> {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }
}
