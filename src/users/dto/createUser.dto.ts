import { Permission } from '../../commons/enums/permission.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiPropertyOptional()
  email: string;

  @ApiPropertyOptional()
  cpf: string;

  @ApiProperty()
  password: string;

  @ApiPropertyOptional()
  role: string;

  @ApiPropertyOptional({ enum: Permission })
  permissions: string[];

  public static from(dto: Partial<CreateUserDto>) {
    const it = new CreateUserDto();
    it.email = dto.email;
    it.cpf = dto.cpf;
    it.password = dto.password;
    it.role = dto.role;
    it.permissions = dto.permissions;
    return it;
  }
}
