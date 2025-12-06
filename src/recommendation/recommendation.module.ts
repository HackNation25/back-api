import { Module } from '@nestjs/common';
import { RecommendationController } from './recommendation.controller';
import { RecommendationService } from './application/recommendation.service';
import { PoiModule } from 'src/poi/poi.module';

@Module({
  imports: [PoiModule],
  controllers: [RecommendationController],
  providers: [
    {
      provide: 'IRecommendationService',
      useClass: RecommendationService,
    },
  ],
  exports: ['IRecommendationService'],
})
export class RecommendationModule {}
