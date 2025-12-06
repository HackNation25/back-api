import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PoiController } from './poi.controller';
import { PoiService } from './application/poi.service';
import { PoiRepository } from './infrastructure/persistence/poi.repository';
import { PoiEntity } from './infrastructure/persistence/poi.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PoiEntity])],
  controllers: [PoiController],
  providers: [
    {
      provide: 'IPoiRepository',
      useClass: PoiRepository,
    },
    {
      provide: 'IPoiService',
      useClass: PoiService,
    },
  ],
  exports: ['IPoiService', 'IPoiRepository'],
})
export class PoiModule {}
