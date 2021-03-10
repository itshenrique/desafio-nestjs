import {
  Controller,
  HttpStatus,
  Response,
  Put,
  Post,
  Body,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/createUser.dto';
import { LoginUserDto } from './dto/login.dto';
import { ResetPasswordDto } from './dto/resetPassword.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  public async register(@Response() res, @Body() createUserDto: CreateUserDto) {
    const result = await this.authService.register(createUserDto);

    if (!result.success) {
      return res.status(HttpStatus.BAD_REQUEST).json(result);
    }
    return res.status(HttpStatus.OK).json(result);
  }

  @Post('login')
  public async login(@Response() res, @Body() login: LoginUserDto) {
    const result = await this.authService.login(login);

    if (!result.success) {
      return res.status(HttpStatus.BAD_REQUEST).json(result);
    }
    return res.status(HttpStatus.OK).json(result);
  }

  @Post('resetPassword')
  public async resetPassword(
    @Response() res,
    @Body() resetPassword: ResetPasswordDto,
  ) {
    const result = await this.authService.resetPassword(resetPassword);

    if (!result.success) {
      return res.status(HttpStatus.BAD_REQUEST).json(result);
    }
    return res.status(HttpStatus.OK).json(result);
  }

  @Put('changePassword')
  public async changePassword(
    @Response() res,
    @Query('token') token: string,
    @Body('password') password: string,
  ) {
    const result = await this.authService.changePassword(token, password);
    if (!result.success) {
      return res.status(HttpStatus.BAD_REQUEST).json(result);
    }
    return res.status(HttpStatus.OK).json(result);
  }
}
