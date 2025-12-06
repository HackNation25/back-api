import { UserProfileEntity } from '../../user-profile.entity';
import { CreateUserProfileDto } from '../../dto/create-user-profile.dto';

export interface IUserProfileService {
  profileUser(dto: CreateUserProfileDto): Promise<UserProfileEntity>;
}
