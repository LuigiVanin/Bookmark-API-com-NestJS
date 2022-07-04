import {
    ForbiddenException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable({})
class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService,
    ) {}

    async signup(dto: AuthDto) {
        const hash = await argon.hash(dto.password);
        try {
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash,
                },
            });
            delete user.hash;
            return user;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException(
                        'Credentials Are Incorrect! Duplicated Email',
                    );
                }
            } else {
                console.log(error);
                throw error;
            }
        }
    }

    async signin(dto: AuthDto) {
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    email: dto.email,
                },
            });
            if (!user) {
                throw new ForbiddenException('No email on our Database');
            }
            const pwdResult = await argon.verify(user.hash, dto.password);
            if (!pwdResult) {
                throw new UnauthorizedException('the password doest match ');
            }
            const token = await this.signToken(user.id, user.email);
            return { token };
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                throw new UnauthorizedException(
                    'Credential are not authorizaed!',
                );
            } else {
                console.log(error);
                throw error;
            }
        }
    }

    signToken(userId: number, email: string): Promise<string> {
        const payload = {
            sub: userId,
            email: email,
        };
        return this.jwt.signAsync(payload, {
            expiresIn: '15m',
            secret: this.config.get('JWT_SECRET'),
        });
    }
}

export { AuthService };
