import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { BookmarkService } from './bookmark.service';
import { CreateBookmark } from './dto';

@Controller('bookmark')
@UseGuards(JwtGuard)
export class BookmarkController {
    constructor(private service: BookmarkService) {}

    @Post('/')
    async createBookmark(
        @Body() bookmark: CreateBookmark,
        @GetUser('id') userId: number,
    ) {
        return await this.service.createBookmark(bookmark, userId);
    }

    @Get('/')
    async getAllBookmarks(@GetUser('id') userId: number) {
        return await this.service.getAllBookmarks(userId);
    }

    @Get('/:id')
    async getBookmarkById(
        @GetUser('id') userId: number,
        @Param('id') id: number,
    ) {
        return await this.service.bookmarkById(userId, id);
    }
}
