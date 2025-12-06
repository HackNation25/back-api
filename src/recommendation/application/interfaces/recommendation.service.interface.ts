import { PoiEntity } from 'src/poi/infrastructure/persistence/poi.entity';

export interface IRecommendationService {
  getRecommendations(userId: string, limit: number): Promise<PoiEntity[]>;
}
