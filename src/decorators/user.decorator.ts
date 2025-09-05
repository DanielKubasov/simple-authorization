// src/decorators/get-user.decorator.ts
import { User as UserType } from '@/modules/user/entities/user.entity';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return request.user as UserType;
    },
);
