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
}
