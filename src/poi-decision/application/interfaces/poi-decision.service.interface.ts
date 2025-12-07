import { PoiDecisionEntity } from '../../infrastructure/persistence/poi-decision.entity';
import { PoiDecisionResponseDto } from '../../dto/poi-decision-response.dto';

export interface IPoiDecisionService {
  getAllByUserProfile(
    userProfileId: string,
    latitude?: number,
    longitude?: number,
  ): Promise<PoiDecisionResponseDto[]>;
  create(decision: PoiDecisionEntity): Promise<PoiDecisionEntity>;
}
