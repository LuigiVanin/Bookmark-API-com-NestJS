import {
    BadRequestException,
    createParamDecorator,
    ExecutionContext,
} from '@nestjs/common';

export const GetUser = createParamDecorator(
    (data: string | undefined, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        if (request.user === undefined) {
            throw new BadRequestException(
                'Sua requisição esta faltando informação de usuário',
            );
        }
        if (data) {
            return request.user[data];
        }
        return request.user;
    },
);
