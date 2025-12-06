import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserProfileEntity } from './user-profile.entity';
import { IUserProfileRepository } from './application/interfaces/user-profile.repository.interface';
import { ChoicesDto } from './dto/create-user-profile.dto';

@Injectable()
export class TypeormUserProfileRepository implements IUserProfileRepository {
  constructor(
    @InjectRepository(UserProfileEntity)
    private readonly repo: Repository<UserProfileEntity>,
  ) {}

  async createUserProfile(choices?: ChoicesDto[]): Promise<UserProfileEntity> {
    const entity = this.repo.create({ choices: choices ?? [] });
    return this.repo.save(entity);
  }
}
