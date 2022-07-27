import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EditUserDto } from './dto';

@Injectable({})
export class UserService {
    constructor(private prisma: PrismaService) {}
    async editUser(userId: number, dto: EditUserDto) {
        if (!Object.keys(dto).length) {
            throw new BadRequestException(
                'Request Body doesnt change anything',
            );
        }
        const user = await this.prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                ...dto,
            },
        });

        delete user.hash;
        return user;
    }
}
