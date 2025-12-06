import { Injectable } from '@nestjs/common';
import { UserProfileEntity } from './user-profile.entity';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { IUserProfileService } from './application/interfaces/user-profile.service.interface';
import { TypeormUserProfileRepository } from './typeorm-user-profile.repository';

@Injectable()
export class UserProfileService implements IUserProfileService {
  constructor(
    private readonly repo: TypeormUserProfileRepository,
  ) {}

  async profileUser(dto: CreateUserProfileDto): Promise<UserProfileEntity> {
    return this.repo.createUserProfile(dto.choices);
  }
}
