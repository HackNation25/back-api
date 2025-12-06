import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfileEntity } from './user-profile.entity';
import { UserProfileService } from './user-profile.service';
import { UserProfileController } from './user-profile.controller';
import { TypeormUserProfileRepository } from './typeorm-user-profile.repository';
import { PoiModule } from '../poi/poi.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserProfileEntity]), PoiModule],
  controllers: [UserProfileController],
  providers: [
    {
      provide: 'IUserProfileRepository',
      useClass: TypeormUserProfileRepository,
    },
    {
      provide: 'IUserProfileService',
      useClass: UserProfileService,
    },
  ],
  exports: ['IUserProfileService'],
})
export class UserProfileModule {}
