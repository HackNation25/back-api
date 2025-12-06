import { PoiDecisionEntity } from '../../infrastructure/persistence/poi-decision.entity';

export interface IPoiDecisionService {
  getAllByUserProfile(userProfileId: string): Promise<PoiDecisionEntity[]>;
  create(decision: PoiDecisionEntity): Promise<PoiDecisionEntity>;
}
