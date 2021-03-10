import { PERMISSIONS_KEY } from '../decorators/permission.decorator';
import { Permission } from '../enums/permission.enum';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PermissionGuard implements CanActivate {
  private readonly logger = new Logger(PermissionGuard.name);

  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<Permission[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredPermissions) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    this.logger.debug('Path permission ' + requiredPermissions);
    this.logger.debug('Validando permission... ' + user.permissions);

    return requiredPermissions.some((permission) =>
      user.permissions?.includes(permission),
    );
  }
}
