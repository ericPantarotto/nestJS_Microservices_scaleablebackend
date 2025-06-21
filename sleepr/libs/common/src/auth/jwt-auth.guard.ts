import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { map, Observable, tap } from 'rxjs';
import { AUTH_SERVICE } from '../constants';
import { UserDto } from '../dto';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(@Inject(AUTH_SERVICE) private readonly authClient: ClientProxy) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    interface AuthenticatedRequest {
      cookies?: { Authentication?: string };
      user?: UserDto;
    }
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const jwt: string | undefined = request.cookies?.Authentication;

    return this.authClient
      .send<UserDto>('authenticate', { Authentication: jwt })
      .pipe(
        tap((res) => {
          const req = context.switchToHttp().getRequest<AuthenticatedRequest>();
          req.user = res;
        }),
        map(() => true),
      );
  }
}
