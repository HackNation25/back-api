import { PoiDecisionEntity } from '../../infrastructure/persistence/poi-decision.entity';

export interface IPoiDecisionRepository {
  findAllByUserProfile(userProfileId: string): Promise<PoiDecisionEntity[]>;
  create(entity: PoiDecisionEntity): Promise<PoiDecisionEntity>;
}
