// import { createParamDecorator, ExecutionContext } from '@nestjs/common';
// import { UserDocument } from '../models/user.schema';

// import { Request } from 'express';

// const getCurrentUserByContext = (context: ExecutionContext): UserDocument => {
//   const request = context.switchToHttp().getRequest<Request>();
//   return request.user as UserDocument;
// };

// export const CurrentUser = createParamDecorator(
//   (_data: unknown, ctx: ExecutionContext) => getCurrentUserByContext(ctx),
// );
