import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'app/decorator/role.decorator';
import { UserDomain } from 'domain/user.domain';
import { Request } from 'express';

/**
 * TypeScript Decorator는 최하단에 정의된 데코레이터 실행한 후에 순서대로 상위 데코레이터를 실행합니다.
 *
 * RoleGuard는 항상 AuthGuard 위에 있어야하므로, Guard 순서를 임의로 변경하지 마세요.
 */

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const roleList = this.reflector.get(Role, context.getHandler());
    if (!roleList || !roleList.length) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as UserDomain;
    return roleList.includes(user.type);
  }
}
