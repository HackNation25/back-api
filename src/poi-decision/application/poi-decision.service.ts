import { Inject, Injectable } from '@nestjs/common';
import { IPoiDecisionService } from './interfaces/poi-decision.service.interface';
import { PoiDecisionEntity } from '../infrastructure/persistence/poi-decision.entity';
import type { IPoiDecisionRepository } from './interfaces/poi-decision.repository.interface';
import { UserProfileService } from '../../user-profile/user-profile.service';
import { Transactional } from 'typeorm-transactional';
import { PoiDecisionResponseDto } from '../dto/poi-decision-response.dto';

@Injectable()
export class PoiDecisionService implements IPoiDecisionService {
  constructor(
    @Inject('IPoiDecisionRepository')
    private readonly repository: IPoiDecisionRepository,
    @Inject('IUserProfileService')
    private readonly userProfileService: UserProfileService,
  ) {}

  async getAllByUserProfile(
    userProfileId: string,
    latitude?: number,
    longitude?: number,
  ): Promise<PoiDecisionResponseDto[]> {
    const list = await this.repository.findAllByUserProfile(userProfileId);

    // If both coordinates provided, compute distance per POI and sort by it
    if (
      typeof latitude === 'number' &&
      !Number.isNaN(latitude) &&
      typeof longitude === 'number' &&
      !Number.isNaN(longitude)
    ) {
      const enriched = list.map((d) => {
        const poi: any = d.poi as any;
        const lat = Number(poi?.locationX);
        const lon = Number(poi?.locationY);
        const hasCoords =
          typeof lat === 'number' &&
          !Number.isNaN(lat) &&
          typeof lon === 'number' &&
          !Number.isNaN(lon);
        const dist = hasCoords
          ? this.distanceInMeters(latitude, longitude, lat, lon)
          : Number.POSITIVE_INFINITY;
        return { d, dist } as const;
      });

      enriched.sort((a, b) => a.dist - b.dist);

      return enriched.map(({ d, dist }) => {
        const dto = PoiDecisionResponseDto.fromEntity(d);
        dto.distanceMeters = Number.isFinite(dist) ? dist : undefined;
        return dto;
      });
    }

    // Otherwise, keep original order and no distance
    return list.map((entity) => PoiDecisionResponseDto.fromEntity(entity));
  }

  @Transactional()
  async create(decision: PoiDecisionEntity): Promise<PoiDecisionEntity> {
    // Extract identifiers robustly (from relation ids or relation stubs)
    const poiId = decision.poiId ?? decision.poi?.uuid;
    const userProfileId = decision.userProfileId ?? decision.userProfile?.uuid;

    if (!poiId || !userProfileId) {
      // Fallback to create to avoid silent failures; DB constraints/validators may throw
      return await this.repository.create(decision);
    }

    const existing = await this.repository.findByPoiAndUser(
      poiId,
      userProfileId,
    );

    await this.userProfileService.updateCategoryWeight(
      userProfileId,
      poiId,
      decision ? 'increase' : 'decrease',
    );

    if (existing) {
      console.log(
        `PoiDecision already exists, updating to ${decision.decision}`,
      );
      existing.decision = decision.decision;
      existing.modifiedAt = new Date();
      return await this.repository.update(existing);
    }

    return await this.repository.create(decision);
  }

  private distanceInMeters(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number {
    const toRad = (deg: number) => (deg * Math.PI) / 180;
    const R = 6371_000; // meters
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }
}
