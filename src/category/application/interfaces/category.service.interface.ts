import { CategoryEntity } from '../../category.entity';
import { CreateCategoryDto } from '../../dto/create-category.dto';

export interface ICategoryService {
  getAll(): Promise<CategoryEntity[]>;
  getById(id: string): Promise<CategoryEntity | null>;
  create(dto: CreateCategoryDto): Promise<CategoryEntity>;
}
