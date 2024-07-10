import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { VerdictStatus } from '../../../enums/verdict-status.enum';

export class VerdictDto {
  @IsEnum(VerdictStatus)
  @ApiProperty({ enum: VerdictStatus, enumName: 'VerdictStatus' })
  status: VerdictStatus;
}
