import { Inject, Injectable } from '@nestjs/common';
import { IPoiDecisionService } from './interfaces/poi-decision.service.interface';
import { PoiDecisionEntity } from '../infrastructure/persistence/poi-decision.entity';
import type { IPoiDecisionRepository } from './interfaces/poi-decision.repository.interface';

@Injectable()
export class PoiDecisionService implements IPoiDecisionService {
  constructor(
    @Inject('IPoiDecisionRepository')
    private readonly repository: IPoiDecisionRepository,
  ) {}

  async getAllByUserProfile(
    userProfileId: string,
  ): Promise<PoiDecisionEntity[]> {
    return await this.repository.findAllByUserProfile(userProfileId);
  }

  async create(decision: PoiDecisionEntity): Promise<PoiDecisionEntity> {
    return await this.repository.create(decision);
  }
}
