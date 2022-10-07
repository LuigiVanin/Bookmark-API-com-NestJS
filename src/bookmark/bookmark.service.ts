import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookmark } from './dto';

@Injectable()
export class BookmarkService {
    constructor(private prisma: PrismaService) {}

    async createBookmark(dto: CreateBookmark, userId: number) {
        const bmWithTitle = await this.prisma.bookmark.findFirst({
            where: {
                title: dto.title,
                userId,
            },
        });
        if (bmWithTitle) {
            throw new ForbiddenException(
                'This same title name already exists for your user',
            );
        }

        return await this.prisma.bookmark.create({
            data: {
                ...dto,
                userId,
            },
        });
    }
    async getAllBookmarks(userId: number) {
        return await this.prisma.bookmark.findMany({
            where: {
                userId,
            },
        });
    }

    async bookmarkById(userId: number, bookmarkId: number) {
        bookmarkId = Number(bookmarkId);

        const bm = await this.prisma.bookmark.findUnique({
            where: { id: bookmarkId },
        });

        if (!bm) {
            throw new NotFoundException('This bookmark dont exist');
        }
        if (bm.userId !== userId) {
            throw new ForbiddenException('This bookmark is not yours');
        }

        return bm;
    }
}
