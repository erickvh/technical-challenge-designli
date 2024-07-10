import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class HeaderDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  value: string;
}
