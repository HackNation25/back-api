import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from './category.entity';
import { ICategoryService } from './application/interfaces/category.service.interface';

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

  async create(name: string, image_url: string): Promise<CategoryEntity> {
    const entity = this.repo.create({ name, image_url });
    return this.repo.save(entity);
  }
}
