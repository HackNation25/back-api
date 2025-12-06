import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IPoiRepository } from '../../application/interfaces/poi.repository.interface';
import { PoiEntity } from './poi.entity';

@Injectable()
export class PoiRepository implements IPoiRepository {
  constructor(
    @InjectRepository(PoiEntity)
    private readonly typeOrmRepository: Repository<PoiEntity>,
  ) {}

  async findById(uuid: string): Promise<PoiEntity | null> {
    const entity = await this.typeOrmRepository.findOne({
      where: { uuid },
    });

    if (!entity) {
      return null;
    }

    return entity;
  }

  async findAll(): Promise<PoiEntity[]> {
    return await this.typeOrmRepository.find();
  }

  async create(poi: PoiEntity): Promise<PoiEntity> {
    return await this.typeOrmRepository.save(poi);
  }

  async update(uuid: string, poi: Partial<PoiEntity>): Promise<PoiEntity | null> {
    const existingEntity = await this.typeOrmRepository.findOne({
      where: { uuid },
    });

    if (!existingEntity) {
      return null;
    }

    const updateData: Partial<PoiEntity> = {};

    if (poi.name !== undefined) {
      updateData.name = poi.name;
    }
    if (poi.shortDescription !== undefined) {
      updateData.shortDescription = poi.shortDescription;
    }
    if (poi.longDescription !== undefined) {
      updateData.longDescription = poi.longDescription;
    }
    if (poi.imageUrl !== undefined) {
      updateData.imageUrl = poi.imageUrl;
    }
    if (poi.popularity !== undefined) {
      updateData.popularity = poi.popularity;
    }
    if (poi.locationX !== undefined && poi.locationY !== undefined) {
      updateData.locationX = poi.locationX;
      updateData.locationY = poi.locationY;
    }

    await this.typeOrmRepository.update(uuid, updateData);
    const updatedEntity = await this.typeOrmRepository.findOne({
      where: { uuid },
    });

    return updatedEntity;
  }

  async delete(uuid: string): Promise<boolean> {
    const result = await this.typeOrmRepository.delete(uuid);
    return (result.affected ?? 0) > 0;
  }
}

