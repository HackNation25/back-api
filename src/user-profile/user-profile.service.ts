import { Inject, Injectable } from '@nestjs/common';
import { UserProfileEntity } from './user-profile.entity';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { IUserProfileService } from './application/interfaces/user-profile.service.interface';
import type { IUserProfileRepository } from './application/interfaces/user-profile.repository.interface';
import { UserProfileDomain } from './user-profile.domain';

@Injectable()
export class UserProfileService implements IUserProfileService {
  constructor(
    @Inject('IUserProfileRepository')
    private readonly repo: IUserProfileRepository,
  ) {}

  async profileUser(dto: CreateUserProfileDto): Promise<UserProfileEntity> {
    return this.repo.createUserProfile(dto.choices);
  }

  async findById(userId: string): Promise<UserProfileDomain> {
    return this.repo.findById(userId);
  }
}
