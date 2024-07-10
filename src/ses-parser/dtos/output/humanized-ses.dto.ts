import { ApiProperty } from '@nestjs/swagger';

export class HumanizedSesDto {
  @ApiProperty({ type: 'boolean' })
  spam: boolean;

  @ApiProperty({ type: 'boolean' })
  virus: boolean;

  @ApiProperty({ type: 'boolean' })
  dns: boolean;

  @ApiProperty({ type: 'string' })
  mes: string;

  @ApiProperty({ type: 'boolean' })
  retrasado: boolean;

  @ApiProperty({ type: 'string' })
  emisor: string;

  @ApiProperty({ type: 'string', isArray: true })
  receptor: string[];
}
