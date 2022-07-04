import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { PrismaService } from '../src/prisma/prisma.service';
import { AppModule } from '../src/app.module';

describe('App e2e', () => {
    let app: INestApplication;
    let prisma: PrismaService;
    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();
        app = moduleRef.createNestApplication();
        app.useGlobalPipes(
            new ValidationPipe({
                whitelist: true,
            }),
        );

        await app.init();
        await app.listen(3333);

        prisma = app.get(PrismaService);
        await prisma.cleanDb();
    });

    afterAll(() => {
        app.close();
    });

    describe('Auth', () => {
        describe('Signup', () => {
            it.todo('should Signup');
        });
        describe('Signin', () => {
            it.todo('should Signup');
        });
    });

    describe('User', () => {
        describe('Get Me', () => {});
        describe('Edit Me', () => {});
    });

    describe('Bookmark', () => {
        describe('Create Bookmark', () => {});
        describe('Get Bookmarks', () => {});
        describe('Create Bookmark by Id', () => {});
        describe('Edit Bookmark', () => {});
        describe('Delete Bookmark', () => {});
    });
});
