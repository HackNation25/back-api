import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PoiDecisionController } from './poi-decision.controller';
import { PoiDecisionService } from './application/poi-decision.service';
import { PoiDecisionEntity } from './infrastructure/persistence/poi-decision.entity';
import { PoiDecisionRepository } from './infrastructure/persistence/poi-decision.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PoiDecisionEntity])],
  controllers: [PoiDecisionController],
  providers: [
    {
      provide: 'IPoiDecisionRepository',
      useClass: PoiDecisionRepository,
    },
    {
      provide: 'IPoiDecisionService',
      useClass: PoiDecisionService,
    },
  ],
  exports: ['IPoiDecisionService', 'IPoiDecisionRepository'],
})
export class PoiDecisionModule {}
