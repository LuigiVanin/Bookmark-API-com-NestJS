import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { PrismaService } from '../src/prisma/prisma.service';
import { AppModule } from '../src/app.module';
import { AuthDto } from 'src/auth/dto';
import { EditUserDto } from 'src/user/dto';

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
        pactum.request.setBaseUrl('http://localhost:3333');
    });

    afterAll(() => {
        app.close();
    });

    describe('Auth', () => {
        const dto: AuthDto = {
            email: 'luisfvanin4@gmail.com',
            password: 'senha123',
        };
        describe('Signup', () => {
            it('should Signup', () => {
                return pactum
                    .spec()
                    .post('/auth/signup')
                    .withBody(dto)
                    .expectStatus(201);
            });

            it('It throw error when email is empty', () => {
                return pactum
                    .spec()
                    .post('/auth/signup')
                    .withBody({ password: dto.password })
                    .expectStatus(400);
            });

            it('It throw error when password is empty', () => {
                return pactum
                    .spec()
                    .post('/auth/signup')
                    .withBody({ email: dto.email })
                    .expectStatus(400);
            });

            it('It should throw error with duplicated email', () => {
                return pactum
                    .spec()
                    .post('/auth/signup')
                    .withBody(dto)
                    .expectStatus(403);
            });
        });

        describe('Signin', () => {
            it('should Signin with sucess', () => {
                return pactum
                    .spec()
                    .post('/auth/signin')
                    .withBody(dto)
                    .expectStatus(200)
                    .stores('userAt', 'token');
            });

            it('It throw error when email is empty', () => {
                return pactum
                    .spec()
                    .post('/auth/signin')
                    .withBody({ password: dto.password })
                    .expectStatus(400);
            });

            it('It throw error when password is empty', () => {
                return pactum
                    .spec()
                    .post('/auth/signin')
                    .withBody({ email: dto.email })
                    .expectStatus(400);
            });
        });
    });

    describe('User', () => {
        describe('Get Me', () => {
            it('should get user information using acess token', () => {
                return pactum
                    .spec()
                    .get('/users/me')
                    .withHeaders({
                        Authorization: 'Bearer $S{userAt}',
                    })
                    .expectStatus(200);
            });
        });
        describe('Edit Me', () => {
            it('should edit user with sucess', () => {
                const dto: EditUserDto = {
                    firstName: 'Luis Felipe',
                    email: 'luisfvanin5@gmail.com',
                };
                return pactum
                    .spec()
                    .patch('/users/')
                    .withHeaders({
                        Authorization: 'Bearer $S{userAt}',
                    })
                    .withBody(dto)
                    .expectStatus(200)
                    .expectBodyContains(dto.firstName)
                    .expectBodyContains(dto.email);
            });
        });
    });

    describe('Bookmark', () => {
        describe('Create Bookmark', () => {});
        describe('Get Bookmarks', () => {});
        describe('Create Bookmark by Id', () => {});
        describe('Edit Bookmark', () => {});
        describe('Delete Bookmark', () => {});
    });
});
