import { CategoryEntity } from '../../category.entity';

export interface ICategoryService {
  getAll(): Promise<CategoryEntity[]>;
  getById(id: string): Promise<CategoryEntity | null>;
  create(name: string, image_url: string): Promise<CategoryEntity>;
}
