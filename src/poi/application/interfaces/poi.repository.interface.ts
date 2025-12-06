import { PoiEntity } from '../../infrastructure/persistence/poi.entity';

export interface IPoiRepository {
  findById(uuid: string): Promise<PoiEntity | null>;
  findAll(): Promise<PoiEntity[]>;
  create(poi: PoiEntity): Promise<PoiEntity>;
  update(uuid: string, poi: Partial<PoiEntity>): Promise<PoiEntity | null>;
  delete(uuid: string): Promise<boolean>;
}

