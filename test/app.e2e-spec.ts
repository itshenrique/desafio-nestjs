import { UsersService } from './../src/users/users.service';
import { AuthService } from './../src/auth/auth.service';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

jest.setTimeout(30000);

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('(POST) auth/register -> cpf', async () => {
    await request(app.getHttpServer())
      .post('/auth/register')
      .type('form')
      .send({
        cpf: '04342357097',
        password: 'password',
      })
      .expect(400);
  });

  it('(POST) auth/register -> email', async () => {
    await request(app.getHttpServer())
      .post('/auth/register')
      .type('form')
      .send({
        email: 'teste',
        password: 'password',
      })
      .expect(400);
  });

  it('(POST) auth/login -> cpf', async () => {
    await request(app.getHttpServer())
      .post('/auth/login')
      .type('form')
      .send({
        cpf: '04342357097',
        password: '123456',
      })
      .expect(200);
  });

  it('(POST) auth/login -> email', async () => {
    await request(app.getHttpServer())
      .post('/auth/login')
      .type('form')
      .send({
        email: 'master@teste.com',
        password: '123456',
      })
      .expect(200);
  });

  it('(POST) auth/resetPassword -> cpf', async () => {
    await request(app.getHttpServer())
      .post('/auth/resetPassword')
      .type('form')
      .send({
        cpf: '04342357097',
      })
      .expect(200);
  });

  it('(POST) auth/resetPassword -> email', async () => {
    await request(app.getHttpServer())
      .post('/auth/resetPassword')
      .type('form')
      .send({
        email: 'master@teste.com',
      })
      .expect(200);
  });

  it('(POST) auth/resetPassword -> email', async () => {
    await request(app.getHttpServer())
      .put('/auth/changePassword?token=123')
      .type('form')
      .send({
        password: 'master@teste.com',
      })
      .expect(500);
  });
});
