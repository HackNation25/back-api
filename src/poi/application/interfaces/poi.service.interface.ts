import { PoiEntity } from '../../infrastructure/persistence/poi.entity';

export interface IPoiService {
  findById(uuid: string): Promise<PoiEntity | null>;
  findRandomByCategory(categoryId: string, limit: number): Promise<PoiEntity[]>;
  findAllByCategory(categoryId: string, limit: number): Promise<PoiEntity[]>;
  findAll(): Promise<PoiEntity[]>;
  create(poi: PoiEntity): Promise<PoiEntity>;
  update(uuid: string, poi: Partial<PoiEntity>): Promise<PoiEntity | null>;
  delete(uuid: string): Promise<boolean>;
}
