import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserProfileEntity } from './user-profile.entity';
import { IUserProfileRepository } from './application/interfaces/user-profile.repository.interface';
import { ChoiceDto } from './dto/create-user-profile.dto';
import { Choice, UserProfileDomain } from './user-profile.domain';

@Injectable()
export class TypeormUserProfileRepository implements IUserProfileRepository {
  constructor(
    @InjectRepository(UserProfileEntity)
    private readonly repo: Repository<UserProfileEntity>,
  ) {}

  async createUserProfile(choices?: ChoiceDto[]): Promise<UserProfileEntity> {
    const entity = this.repo.create({ choices: choices ?? [] });
    return this.repo.save(entity);
  }

  async findById(userId: string): Promise<UserProfileDomain> {
    const entity = await this.repo.findOne({ where: { uuid: userId } });
    if (!entity) {
      throw new NotFoundException('User profile not found');
    }
    return new UserProfileDomain(
      entity.uuid,
      entity.choices.map(
        (choice) =>
          new Choice(choice.category_id, choice.choice, choice.categoryWeight),
      ),
    );
  }

  public async update(
    userId: string,
    choices?: ChoiceDto[],
  ): Promise<UserProfileEntity> {
    const entity = await this.repo.findOne({ where: { uuid: userId } });
    if (!entity) {
      throw new NotFoundException('User profile not found');
    }

    if (choices !== undefined) {
      entity.choices = choices;
    }

    return await this.repo.save(entity);
  }
}
