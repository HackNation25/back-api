import { Module } from '@nestjs/common';
import { RecommendationController } from './recommendation.controller';
import { RecommendationService } from './application/recommendation.service';
import { PoiModule } from 'src/poi/poi.module';
import { UserProfileModule } from 'src/user-profile/user-profile.module';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports: [PoiModule, UserProfileModule, CategoryModule],
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

