import {
    Controller,
    Inject,
    Param,
    Get,
    Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import type { IRecommendationService } from './application/interfaces/recommendation.service.interface';
import { PoiResponseDto } from 'src/poi/dto/poi-response.dto';

@ApiTags('RECOMMENDATION')
@Controller('recommendation')
export class RecommendationController {
    constructor(
      @Inject('IRecommendationService')
      private readonly recommendationService: IRecommendationService,
    ) {}
  
    @Get()
    @ApiOperation({ summary: 'Get recommendations based on user preferences' })
    @ApiResponse({
      status: 201,
      description: 'Recommendations fetched successfully',
      type: [PoiResponseDto],
    })
    @ApiResponse({ status: 400, description: 'Bad request' })
    async getRecommendations(@Query('userId') userId: string, @Query('limit') limit: number): Promise<PoiResponseDto[]> {
      const pois = await this.recommendationService.getRecommendations(userId, limit)
      return pois.map(PoiResponseDto.fromEntity);
    }
}
  
  