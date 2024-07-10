import { ApiProperty } from '@nestjs/swagger';
import { IsUrl } from 'class-validator';

export class EmailPathDto {
  @IsUrl()
  @ApiProperty()
  fileUrl: string;
}
