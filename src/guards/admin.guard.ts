import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const adminKey = request.headers['x-admin-key'];

    if (!adminKey) {
      throw new UnauthorizedException('Admin key is required');
    }

    const expectedAdminKey = this.configService.get<string>('ADMIN_KEY');

    if (!expectedAdminKey) {
      throw new UnauthorizedException('Admin key is not configured');
    }

    if (adminKey !== expectedAdminKey) {
      throw new UnauthorizedException('Invalid admin key');
    }

    return true;
  }
}

