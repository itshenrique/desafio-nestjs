import { ApiProperty } from '@nestjs/swagger';
import { Permission } from '../../commons/enums/permission.enum';

export class UserDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  cpf: string;

  @ApiProperty()
  role: string;

  @ApiProperty({ enum: Permission })
  permissions: string[];

  public static from(dto: Partial<UserDto>) {
    const it = new UserDto();
    it.id = dto.id;
    it.email = dto.email;
    it.cpf = dto.cpf;
    it.role = dto.role;
    it.permissions = dto.permissions;
    return it;
  }
}
