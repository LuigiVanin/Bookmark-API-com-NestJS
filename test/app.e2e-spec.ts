import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { PrismaService } from '../src/prisma/prisma.service';
import { AppModule } from '../src/app.module';
import { AuthDto } from 'src/auth/dto';
import { EditUserDto } from 'src/user/dto';
import { CreateBookmark } from 'src/bookmark/dto';

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
        await app.listen(8080);

        prisma = app.get(PrismaService);
        await prisma.cleanDb();
        pactum.request.setBaseUrl('http://localhost:8080');
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
        const dto: CreateBookmark = {
            title: 'cute rabbit video - 480p',
            description: 'Thats a cute rabbit video, please enjoy',
            link: 'https://www.youtube.com/watch?v=dpvUQagTRHM',
        };
        describe('Create Bookmark', () => {
            it('create bookmark sucessfully', () => {
                return pactum
                    .spec()
                    .post('/bookmark')
                    .withHeaders({
                        Authorization: 'Bearer $S{userAt}',
                    })
                    .withBody(dto)
                    .expectStatus(201)
                    .expectBodyContains(dto.title)
                    .expectBodyContains(dto.description)
                    .expectBodyContains(dto.link);
            });

            it('trying to insert bookmark with the same title 4 the same user', () => {
                return pactum
                    .spec()
                    .post('/bookmark')
                    .withHeaders({
                        Authorization: 'Bearer $S{userAt}',
                    })
                    .withBody(dto)
                    .expectStatus(403);
            });

            it('trying to insert bookmark with blank title', () => {
                const tmp = { ...dto };
                delete tmp.title;
                return pactum
                    .spec()
                    .post('/bookmark')
                    .withHeaders({
                        Authorization: 'Bearer $S{userAt}',
                    })
                    .withBody(tmp)
                    .expectStatus(400);
            });
        });
        describe('Get Bookmarks', () => {
            it('get all bookmarks from a user', () => {
                return pactum
                    .spec()
                    .get('/bookmark')
                    .withHeaders({
                        Authorization: 'Bearer $S{userAt}',
                    })
                    .expectStatus(200);
            });
        });
        describe('Get Bookmark by Id', () => {
            it('get inexistent bookmark from a user by id', () => {
                return pactum
                    .spec()
                    .get('/bookmark/19029283')
                    .withHeaders({
                        Authorization: 'Bearer $S{userAt}',
                    })
                    .expectStatus(404);
            });
        });
        describe('Edit Bookmark', () => {});
        describe('Delete Bookmark', () => {});
    });
});
