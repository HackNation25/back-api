import { Inject, Injectable } from '@nestjs/common';
import { IPoiDecisionService } from './interfaces/poi-decision.service.interface';
import { PoiDecisionEntity } from '../infrastructure/persistence/poi-decision.entity';
import type { IPoiDecisionRepository } from './interfaces/poi-decision.repository.interface';
import { UserProfileService } from '../../user-profile/user-profile.service';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class PoiDecisionService implements IPoiDecisionService {
  constructor(
    @Inject('IPoiDecisionRepository')
    private readonly repository: IPoiDecisionRepository,
    @Inject('IUserProfileService')
    private readonly userProfileService: UserProfileService,
  ) {}

  async getAllByUserProfile(
    userProfileId: string,
  ): Promise<PoiDecisionEntity[]> {
    return await this.repository.findAllByUserProfile(userProfileId);
  }

  @Transactional()
  async create(decision: PoiDecisionEntity): Promise<PoiDecisionEntity> {
    // Extract identifiers robustly (from relation ids or relation stubs)
    const poiId = decision.poiId ?? decision.poi?.uuid;
    const userProfileId = decision.userProfileId ?? decision.userProfile?.uuid;

    if (!poiId || !userProfileId) {
      // Fallback to create to avoid silent failures; DB constraints/validators may throw
      return await this.repository.create(decision);
    }

    const existing = await this.repository.findByPoiAndUser(
      poiId,
      userProfileId,
    );

    await this.userProfileService.updateCategoryWeight(
      userProfileId,
      poiId,
      decision ? 'increase' : 'decrease',
    );

    if (existing) {
      console.log(
        `PoiDecision already exists, updating to ${decision.decision}`,
      );
      existing.decision = decision.decision;
      existing.modifiedAt = new Date();
      return await this.repository.update(existing);
    }

    return await this.repository.create(decision);
  }
}
