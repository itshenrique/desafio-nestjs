import { ResetPasswordDto } from './dto/resetPassword.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UsersService } from './../users/users.service';
import { CreateUserDto } from './../users/dto/createUser.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findAll: jest.fn(),
            findByCpf: jest.fn(),
            findByEmail: jest.fn(),
            finfindByCpfOrEmaildAll: jest.fn(),
            findById: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            register: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should register', async () => {
    const user = CreateUserDto.from({
      email: 'teste',
      password: 'teste123',
    });
    usersService.register = jest.fn().mockReturnValue({ data: 'teste' });
    const result = await authService.register(user);
    expect(result).toEqual({ data: 'teste' });
  });

  it('validate user token', async () => {
    const payload: JwtPayload = {
      id: '1',
      email: '1',
      cpf: '1',
      password: '1',
      accessToken: '1',
    };

    usersService.findById = jest.fn().mockReturnValue({ data: 'teste' });
    const result = await authService.validateUserToken(payload);

    expect(result).toEqual({ data: 'teste' });
  });

  it('validate User', async () => {
    const cpf = '1';
    const email = '1';
    const password = '';

    const comparePassword = jest.fn().mockReturnValue(true);

    usersService.findByCpfOrEmail = jest
      .fn()
      .mockReturnValue({ comparePassword });

    const result = await authService.validateUser(cpf, email, password);

    expect(result).toEqual({ comparePassword });
  });

  it('reset password', async () => {
    const resetPassword = ResetPasswordDto.from({
      cpf: '12345',
      email: '123456',
    });

    usersService.findByCpfOrEmail = jest.fn().mockReturnValue(true);

    const result = await authService.resetPassword(resetPassword);

    expect(result.success).toEqual(true);
  });
});
