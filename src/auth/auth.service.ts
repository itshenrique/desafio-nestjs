import { Validator } from './../commons/validator';
import { UpdateUserDto } from './../users/dto/updateUser.dto';
import { JwtService } from '@nestjs/jwt';
import { ResetPasswordDto } from './dto/resetPassword.dto';
import { LoginUserDto } from './dto/login.dto';
import { jwtConstants } from './constants';
import * as jwt from 'jsonwebtoken';
import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { User } from '../users/user.entity';
import { CreateUserDto } from '../users/dto/createUser.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  private readonly logger = new Logger(AuthService.name);

  async register(user: CreateUserDto) {
    const { email, cpf } = user;

    if (!cpf && !email) {
    } else if (cpf) {
      if (Validator.isCpf(cpf)) {
        return await this.usersService.register(user);
      }
    } else if (email) {
      if (Validator.isEmail(email)) {
        return await this.usersService.register(user);
      }
    }
    return { success: false, message: 'Dados incorretos!' };
  }

  async login(loginUser: LoginUserDto) {
    const { email, cpf, password } = loginUser;

    if (!cpf && !email) {
      return { success: false };
    }

    const user = await this.validateUser(cpf, email, password);

    if (user) {
      const accessToken = jwt.sign(
        {
          id: user.id,
          email: user.email,
          cpf: user.cpf,
          accessToken: true,
        },
        jwtConstants.secret,
        { expiresIn: jwtConstants.expiresIn },
      );
      return {
        success: true,
        expiresIn: jwtConstants.expiresIn,
        accessToken,
      };
    }
    return { success: false };
  }

  async validateUserToken(payload: JwtPayload): Promise<User> {
    return await this.usersService.findById(payload.id);
  }

  async validateUser(cpf: string, email: string, password: string) {
    const user = await this.usersService.findByCpfOrEmail(cpf, email);

    if (user) {
      const isPasswordCorrect = await user.comparePassword(password);

      if (isPasswordCorrect) {
        this.logger.log('password checado com sucesso');
        return user;
      }
    }
    return null;
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const { cpf, email } = resetPasswordDto;
    const user = await this.usersService.findByCpfOrEmail(cpf, email);

    if (user) {
      const token = jwt.sign(
        {
          id: user.id,
          password: user.password,
        },
        jwtConstants.resetTokenSecret,
        { expiresIn: jwtConstants.resetTokenExpirationTime },
      );

      return {
        success: true,
        token,
      };
    }

    return {
      success: false,
    };
  }

  async changePassword(token: string, password: string) {
    if (jwt.verify(token, jwtConstants.resetTokenSecret)) {
      const user = JSON.parse(JSON.stringify(jwt.decode(token)));
      const userEntity = await this.usersService.findById(user.id);

      if (userEntity.password === user.password) {
        const updateUser = UpdateUserDto.from(user);
        updateUser.password = password;
        return await this.usersService.update(updateUser);
      }
    }

    return {
      success: false,
    };
  }
}
