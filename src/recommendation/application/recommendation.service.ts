import { Inject, Injectable } from "@nestjs/common";
import { IRecommendationService } from "./interfaces/recommendation.service.interface";
import { PoiEntity } from "src/poi/infrastructure/persistence/poi.entity";
import type { IPoiService } from "src/poi/application/interfaces/poi.service.interface";

@Injectable()
export class RecommendationService implements IRecommendationService {

    constructor(
        @Inject("IPoiService")
        private readonly poiService: IPoiService,
    ){}

    async getRecommendations(userId: string, limit: number): Promise<PoiEntity[]> {
        //get user preferences

        //prepare recommendation parameters

        //query poi service for pois matching criterias
        return this.poiService.findRandomByCategory("", limit);
    }
}