import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfileEntity } from './user-profile.entity';
import { UserProfileService } from './user-profile.service';
import { UserProfileController } from './user-profile.controller';
import { TypeormUserProfileRepository } from './typeorm-user-profile.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserProfileEntity])],
  controllers: [UserProfileController],
  providers: [UserProfileService, TypeormUserProfileRepository],
})
export class UserProfileModule {}
