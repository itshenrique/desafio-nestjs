import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiPropertyOptional()
  readonly email: string;

  @ApiPropertyOptional()
  readonly cpf: string;

  @ApiProperty()
  readonly password: string;
}
