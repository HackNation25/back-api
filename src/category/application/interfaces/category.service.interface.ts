import { CategoryEntity } from '../../category.entity';

export interface ICategoryService {
  getById(id: string): Promise<CategoryEntity | null>;
  create(name: string, image_url: string): Promise<CategoryEntity>;
}
