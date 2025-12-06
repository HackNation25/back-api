import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IPoiDecisionRepository } from '../../application/interfaces/poi-decision.repository.interface';
import { PoiDecisionEntity } from './poi-decision.entity';

@Injectable()
export class PoiDecisionRepository implements IPoiDecisionRepository {
  constructor(
    @InjectRepository(PoiDecisionEntity)
    private readonly typeOrmRepository: Repository<PoiDecisionEntity>,
  ) {}

  async findAllByUserProfile(
    userProfileId: string,
  ): Promise<PoiDecisionEntity[]> {
    return await this.typeOrmRepository.find({ where: { userProfileId } });
  }

  async create(entity: PoiDecisionEntity): Promise<PoiDecisionEntity> {
    return await this.typeOrmRepository.save(entity);
  }

  async findByPoiAndUser(
    poiId: string,
    userProfileId: string,
  ): Promise<PoiDecisionEntity | null> {
    return await this.typeOrmRepository.findOne({
      where: { poi: { uuid: poiId }, userProfile: { uuid: userProfileId } },
      relations: [],
    });
  }

  async update(entity: PoiDecisionEntity): Promise<PoiDecisionEntity> {
    // save() with a primary key performs an update
    return await this.typeOrmRepository.save(entity);
  }
}
