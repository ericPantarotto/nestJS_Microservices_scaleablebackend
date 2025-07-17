import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../models/user.entity';

const getCurrentUserByContext = (context: ExecutionContext): User => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
  return context.switchToHttp().getRequest().user;
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);
