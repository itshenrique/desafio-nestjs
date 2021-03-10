import { ApiPropertyOptional } from '@nestjs/swagger';

export class ResetPasswordDto {
  @ApiPropertyOptional()
  email: string;

  @ApiPropertyOptional()
  cpf: string;

  public static from(dto: Partial<ResetPasswordDto>) {
    const it = new ResetPasswordDto();
    it.email = dto.email;
    it.cpf = dto.cpf;
    return it;
  }
}
