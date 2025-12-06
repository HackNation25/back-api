import { Inject, Injectable } from "@nestjs/common";
import { IRecommendationService } from "./interfaces/recommendation.service.interface";
import { PoiEntity } from "src/poi/infrastructure/persistence/poi.entity";
import type { IPoiService } from "src/poi/application/interfaces/poi.service.interface";
import type { IUserProfileService } from "src/user-profile/application/interfaces/user-profile.service.interface";
import type { ICategoryService } from "src/category/application/interfaces/category.service.interface";

@Injectable()
export class RecommendationService implements IRecommendationService {

    constructor(
        @Inject("IPoiService")
        private readonly poiService: IPoiService,
        @Inject("IUserProfileService")
        private readonly userProfileService: IUserProfileService,
        @Inject("ICategoryService")
        private readonly categoryService: ICategoryService,
    ){}

    async getRecommendations(userId: string, limit: number): Promise<PoiEntity[]> {
        //get user preferences
        const userPreferences = await this.userProfileService.findById(userId);
        const selectedCategories = userPreferences.choices
            .filter(choice => choice.choice !== "0")
            .map(choice => choice.category_id);

        const categories = await Promise.all(selectedCategories
            .map(categoryId => this.categoryService.getById(categoryId)))
            .then(categories => categories.filter(category => category !== null));

        //get category based on user preferences
        const category = categories[0];//FIXME

        //query poi service for pois matching criterias
        return this.poiService.findRandomByCategory(category.id, limit);
    }
}
