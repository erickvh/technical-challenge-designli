import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';
import { SesDto } from './ses.dto';

export class SesEventRecordDto {
  @IsString()
  eventVersion: string;

  @ValidateNested()
  @Type(() => SesDto)
  ses: SesDto;

  @IsString()
  eventSource: string;
}
