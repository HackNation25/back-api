import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Inject,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import type { IPoiService } from './application/interfaces/poi.service.interface';
import { CreatePoiDto } from './dto/create-poi.dto';
import { UpdatePoiDto } from './dto/update-poi.dto';
import { PoiResponseDto } from './dto/poi-response.dto';
import { AdminGuard } from 'src/guards/admin.guard';

@ApiTags('POI')
@Controller('poi')
export class PoiController {
  constructor(
    @Inject('IPoiService')
    private readonly poiService: IPoiService,
  ) {}

  @Post()
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Create a new POI' })
  @ApiResponse({
    status: 201,
    description: 'POI created successfully',
    type: PoiResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async create(@Body() createPoiDto: CreatePoiDto): Promise<PoiResponseDto> {
    const poi = await this.poiService.create(createPoiDto.toEntity());
    return PoiResponseDto.fromEntity(poi);
  }

  @Get()
  @ApiOperation({ summary: 'Get all POIs' })
  @ApiResponse({
    status: 200,
    description: 'List of all POIs',
    type: [PoiResponseDto],
  })
  async findAll(): Promise<PoiResponseDto[]> {
    const pois = await this.poiService.findAll();
    return pois.map((poi) => PoiResponseDto.fromEntity(poi));
  }

  @Get(':uuid')
  @ApiOperation({ summary: 'Get a POI by UUID' })
  @ApiResponse({
    status: 200,
    description: 'POI found',
    type: PoiResponseDto,
  })
  @ApiResponse({ status: 404, description: 'POI not found' })
  async findOne(@Param('uuid') uuid: string): Promise<PoiResponseDto> {
    const poi = await this.poiService.findById(uuid);
    if (!poi) {
      throw new NotFoundException(`POI with UUID ${uuid} not found`);
    }
    return PoiResponseDto.fromEntity(poi);
  }

  @Put(':uuid')
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Update a POI' })
  @ApiResponse({
    status: 200,
    description: 'POI updated successfully',
    type: PoiResponseDto,
  })
  @ApiResponse({ status: 404, description: 'POI not found' })
  async update(
    @Param('uuid') uuid: string,
    @Body() updatePoiDto: UpdatePoiDto,
  ): Promise<PoiResponseDto> {
    const poi = await this.poiService.update(uuid, updatePoiDto.toEntity());
    if (!poi) {
      throw new NotFoundException(`POI with UUID ${uuid} not found`);
    }
    return PoiResponseDto.fromEntity(poi);
  }

  @Delete(':uuid')
  @UseGuards(AdminGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a POI' })
  @ApiResponse({ status: 204, description: 'POI deleted successfully' })
  @ApiResponse({ status: 404, description: 'POI not found' })
  async remove(@Param('uuid') uuid: string): Promise<void> {
    const deleted = await this.poiService.delete(uuid);
    if (!deleted) {
      throw new NotFoundException(`POI with UUID ${uuid} not found`);
    }
  }
}
