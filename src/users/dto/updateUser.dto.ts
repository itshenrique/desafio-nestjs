import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from '../../commons/enums/role.enum';

export class UpdateUserDto {
  @ApiProperty()
  id: string;

  @ApiPropertyOptional()
  password: string;

  @ApiPropertyOptional()
  role: string;

  @ApiPropertyOptional()
  permissions: string[];

  public static from(dto: Partial<UpdateUserDto>) {
    const it = new UpdateUserDto();
    it.id = dto.id;
    it.password = dto.password;
    it.role = dto.role;
    it.permissions = dto.permissions;
    return it;
  }
}
