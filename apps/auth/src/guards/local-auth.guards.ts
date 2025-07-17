/* eslint-disable @typescript-eslint/no-unsafe-call */
import { AuthGuard } from '@nestjs/passport';

export class LocalAuthGuard extends AuthGuard('local') {}
