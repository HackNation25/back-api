import { Injectable, Inject } from '@nestjs/common';
import type { IPoiService } from './interfaces/poi.service.interface';
import type { IPoiRepository } from './interfaces/poi.repository.interface';
import { PoiEntity } from '../infrastructure/persistence/poi.entity';

@Injectable()
export class PoiService implements IPoiService {
  constructor(
    @Inject('IPoiRepository')
    private readonly poiRepository: IPoiRepository,
  ) {}

  async findById(uuid: string): Promise<PoiEntity | null> {
    return this.poiRepository.findById(uuid);
  }

  async findAll(): Promise<PoiEntity[]> {
    return this.poiRepository.findAll();
  }

  async create(poi: PoiEntity): Promise<PoiEntity> {
    return this.poiRepository.create(poi);
  }

  async update(
    uuid: string,
    poi: Partial<PoiEntity>,
  ): Promise<PoiEntity | null> {
    return this.poiRepository.update(uuid, poi);
  }

  async delete(uuid: string): Promise<boolean> {
    return this.poiRepository.delete(uuid);
  }
}

