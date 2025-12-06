import { UserProfileEntity } from '../../user-profile.entity';
import { CreateUserProfileDto } from '../../dto/create-user-profile.dto';
import { UserProfileDomain } from 'src/user-profile/user-profile.domain';

export interface IUserProfileService {
  profileUser(dto: CreateUserProfileDto): Promise<UserProfileEntity>;
  findById(userId: string): Promise<UserProfileDomain>;
}
