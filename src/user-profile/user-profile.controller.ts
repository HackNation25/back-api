import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { UserProfileService } from './user-profile.service';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { UserProfileEntity } from './user-profile.entity';
import { UserProfileDomain } from './user-profile.domain';

@ApiTags('user-profile')
@Controller('user/profile')
export class UserProfileController {
  constructor(
    @Inject('IUserProfileService')
    private readonly userProfileService: UserProfileService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a user profile' })
  @ApiBody({
    description: 'Payload for creating a user profile',
    type: CreateUserProfileDto,
    examples: {
      default: {
        summary: 'Example payload',
        value: {
          choices: [
            {
              category_id: '8a49f1b5-9a42-4a1f-9c8e-3f6f5c9f1a2b',
              choice: '1',
            },
            {
              category_id: '3c2a7f12-5d3e-4b9a-8e6f-2b1c9d8f7a6e',
              choice: '2',
            },
          ],
        },
      },
    },
  })
  create(@Body() dto: CreateUserProfileDto): Promise<UserProfileEntity> {
    return this.userProfileService.createProfileUser(dto);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get a user profile by id' })
  @ApiParam({ name: 'id', description: 'User profile id (UUID)' })
  findOne(@Param('id') id: string): Promise<UserProfileDomain> {
    return this.userProfileService.findById(id);
  }
}
