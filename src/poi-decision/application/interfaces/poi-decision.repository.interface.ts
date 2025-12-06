import { PoiDecisionEntity } from '../../infrastructure/persistence/poi-decision.entity';

export interface IPoiDecisionRepository {
  findAllByUserProfile(userProfileId: string): Promise<PoiDecisionEntity[]>;
  findByPoiAndUser(
    poiId: string,
    userProfileId: string,
  ): Promise<PoiDecisionEntity | null>;
  create(entity: PoiDecisionEntity): Promise<PoiDecisionEntity>;
  update(entity: PoiDecisionEntity): Promise<PoiDecisionEntity>;
}
