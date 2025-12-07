import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IRecommendationService } from './interfaces/recommendation.service.interface';
import { PoiEntity } from 'src/poi/infrastructure/persistence/poi.entity';
import type { IPoiService } from 'src/poi/application/interfaces/poi.service.interface';
import type { IUserProfileService } from 'src/user-profile/application/interfaces/user-profile.service.interface';
import type { IPoiDecisionService } from 'src/poi-decision/application/interfaces/poi-decision.service.interface';

@Injectable()
export class RecommendationService implements IRecommendationService {
  constructor(
    @Inject('IPoiService')
    private readonly poiService: IPoiService,
    @Inject('IUserProfileService')
    private readonly userProfileService: IUserProfileService,
    @Inject('IPoiDecisionService')
    private readonly poiDecisionService: IPoiDecisionService,
  ) {}

  async getRecommendations(
    userId: string,
    limit: number,
    excludedCategories: string[] = [],
    excludedPois: string[] = [],
  ): Promise<PoiEntity[]> {
    //get user preferences
    const userProfile = await this.userProfileService.findById(userId);
    const selectedCategoriesWithWeights = userProfile.choices
      .filter((choice) => choice.choice !== '0')
      .map((choice) => ({
        categoryId: choice.category_id,
        weight: choice.categoryWeight,
      }));

    //select category based on weights (random with probability)
    const weightsSum = selectedCategoriesWithWeights.reduce(
      (acc, curr) => acc + curr.weight,
      0,
    );
    const randomNumber = Math.random() * weightsSum;
    let cumulativeWeight = 0;
    let selectedCategory: string | null = null;
    for (const category of selectedCategoriesWithWeights) {
      if (selectedCategory) {
        break;
      }
      cumulativeWeight += category.weight;
      if (randomNumber <= cumulativeWeight) {
        selectedCategory = category.categoryId;
        break;
      }
    }

    //query poi service for pois matching criterias
    if (!selectedCategory) {
      throw new NotFoundException('No category selected');
    }

    const categoryPois = await this.poiService.findAllByCategory(
      selectedCategory,
      limit,
    );

    //random by popularity
    const randomPois = categoryPois
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, limit);

    const poiDecisions =
      await this.poiDecisionService.getAllByUserProfile(userId);
    const poiDecisionsMap = new Set<string>(
      poiDecisions.map((decision) => decision.poiId),
    );
    const filteredPois = randomPois.filter(
      (poi) =>
        !poiDecisionsMap.has(poi.uuid) && !excludedPois.includes(poi.uuid),
    );

    if (filteredPois.length === 0) {
      return [];
    }

    return filteredPois;
  }
}
