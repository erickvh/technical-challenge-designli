import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';
import { SesDto } from './ses.dto';

export class SesEventRecordDto {
  @IsString()
  @ApiProperty()
  eventVersion: string;

  @ValidateNested()
  @Type(() => SesDto)
  @ApiProperty({ type: SesDto })
  ses: SesDto;

  @IsString()
  @ApiProperty()
  eventSource: string;
}
