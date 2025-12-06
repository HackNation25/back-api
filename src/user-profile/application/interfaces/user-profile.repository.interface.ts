import { UserProfileEntity } from '../../user-profile.entity';
import { ChoicesDto } from '../../dto/create-user-profile.dto';

export interface IUserProfileRepository {
  createUserProfile(choices?: ChoicesDto[]): Promise<UserProfileEntity>;
}
