import { ChoiceDto } from 'src/user-profile/dto/create-user-profile.dto';
import { UserProfileEntity } from '../../user-profile.entity';
import { UserProfileDomain } from 'src/user-profile/user-profile.domain';

export interface IUserProfileRepository {
  createUserProfile(choices?: ChoiceDto[]): Promise<UserProfileEntity>;
  findById(userId: string): Promise<UserProfileDomain>;
  update(userId: string, choices?: ChoiceDto[]): Promise<UserProfileEntity>;
}
