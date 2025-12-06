import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserProfileEntity } from './user-profile.entity';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { IUserProfileService } from './application/interfaces/user-profile.service.interface';
import type { IUserProfileRepository } from './application/interfaces/user-profile.repository.interface';
import { Choice, UserProfileDomain } from './user-profile.domain';
import { PoiService } from '../poi/application/poi.service';

@Injectable()
export class UserProfileService implements IUserProfileService {
  constructor(
    @Inject('IUserProfileRepository')
    private readonly repo: IUserProfileRepository,
    @Inject('IPoiService')
    private readonly poiService: PoiService,
  ) {}

  async createProfileUser(
    dto: CreateUserProfileDto,
  ): Promise<UserProfileEntity> {
    //Set the default category weight
    //@TODO Typy do poprawy potem
    dto.choices?.map((choice) => {
      choice.categoryWeight = parseInt(
        process.env.INITIAL_CATEGORY_WEIGHT || '50',
      );
    });

    return this.repo.createUserProfile(dto.choices);
  }

  public async findById(userId: string): Promise<UserProfileDomain> {
    return this.repo.findById(userId);
  }

  public async updateProfileUser(userId: string, dto: CreateUserProfileDto) {
    await this.repo.update(userId, dto.choices);
  }

  public async updateCategoryWeight(
    userId: string,
    poiId: string,
    direction: 'increase' | 'decrease',
  ) {
    const userProfile = await this.repo.findById(userId);
    const poi = await this.poiService.findById(poiId);
    if (!poi) {
      throw new NotFoundException('Poi not found');
    }

    const categoryId = poi.categoryId;
    console.log('[updateCategoryWeight] Category ID:', categoryId);

    userProfile.choices = userProfile.choices?.map((choice) => {
      if (choice.category_id === categoryId) {
        if (direction === 'increase') {
          return new Choice(
            choice.category_id,
            choice.choice,
            choice.categoryWeight + 1,
          );
        } else if (direction === 'decrease') {
          return new Choice(
            choice.category_id,
            choice.choice,
            choice.categoryWeight - 1,
          );
        }
      }
      return choice;
    });
    await this.updateProfileUser(userId, userProfile as CreateUserProfileDto);
  }
}
