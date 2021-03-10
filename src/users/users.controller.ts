import { PermissionGuard } from '../commons/guards/permission.guard';
import { RolesGuard } from '../commons/guards/roles.guard';
import { UpdateUserDto } from './dto/updateUser.dto';
import {
  Controller,
  Body,
  Get,
  Put,
  Response,
  HttpStatus,
  UseGuards,
  Param,
  Logger,
} from '@nestjs/common';
import { Roles } from '../commons/decorators/role.decorator';
import { Role } from '../commons/enums/role.enum';
import { Permissions } from '../commons/decorators/permission.decorator';
import { Permission } from '../commons/enums/permission.enum';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../commons/guards/jwt-auth.guard';

@ApiTags('users')
@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(private userService: UsersService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Guest)
  @Permissions(Permission.Visualizar)
  @Get(':cpf')
  public async findByCpf(@Response() res, @Param('cpf') cpf: string) {
    const result = await this.userService.findByCpf(cpf);

    if (!result.success) {
      return res.status(HttpStatus.BAD_REQUEST).json(result);
    }
    return res.status(HttpStatus.OK).json(result);
  }

  @UseGuards(JwtAuthGuard, RolesGuard, PermissionGuard)
  @Roles(Role.Admin, Role.Guest)
  @Permissions(Permission.Listar)
  @Get()
  public async findAll(@Response() res) {
    const result = await this.userService.findAll();

    if (!result.success) {
      return res.status(HttpStatus.BAD_REQUEST).json(result);
    }
    return res.status(HttpStatus.OK).json(result);
  }

  @UseGuards(JwtAuthGuard, RolesGuard, PermissionGuard)
  @Roles(Role.Admin)
  @Permissions(Permission.Editar)
  @Put('update')
  public async update(@Response() res, @Body() updateUserDto: UpdateUserDto) {
    const result = await this.userService.update(updateUserDto);

    if (!result.success) {
      return res.status(HttpStatus.BAD_REQUEST).json(result);
    }
    return res.status(HttpStatus.OK).json(result);
  }
}
