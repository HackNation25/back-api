import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import type { IPoiDecisionService } from './application/interfaces/poi-decision.service.interface';
import { CreatePoiDecisionDto } from './dto/create-poi-decision.dto';
import { PoiDecisionResponseDto } from './dto/poi-decision-response.dto';

@ApiTags('POI-Decision')
@Controller('poi-decision')
export class PoiDecisionController {
  constructor(
    @Inject('IPoiDecisionService')
    private readonly service: IPoiDecisionService,
  ) {}

  @Get('user/:userProfileId')
  @ApiOperation({ summary: 'Get all decisions by user profile' })
  @ApiQuery({
    name: 'latitude',
    required: false,
    type: Number,
    description: 'Current user latitude',
  })
  @ApiQuery({
    name: 'longitude',
    required: false,
    type: Number,
    description: 'Current user longitude',
  })
  @ApiResponse({
    status: 200,
    description: 'List of decisions',
    type: [PoiDecisionResponseDto],
  })
  async getByUser(
    @Param('userProfileId') userProfileId: string,
    @Query('latitude') latitude?: string,
    @Query('longitude') longitude?: string,
  ): Promise<PoiDecisionResponseDto[]> {
    const latNum = latitude !== undefined ? Number(latitude) : undefined;
    const lonNum = longitude !== undefined ? Number(longitude) : undefined;
    return await this.service.getAllByUserProfile(
      userProfileId,
      latNum,
      lonNum,
    );
  }

  @Post()
  @ApiOperation({ summary: 'Create a new POI decision' })
  @ApiResponse({
    status: 201,
    description: 'Decision created',
    type: PoiDecisionResponseDto,
  })
  async create(
    @Body() dto: CreatePoiDecisionDto,
  ): Promise<PoiDecisionResponseDto> {
    const entity = await this.service.create(dto.toEntity());
    return PoiDecisionResponseDto.fromEntity(entity);
  }
}
