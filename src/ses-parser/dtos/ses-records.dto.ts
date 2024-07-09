import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { SesEventRecordDto } from './ses-event-record.dto';

export class SesRecordsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SesEventRecordDto)
  Records: SesEventRecordDto[];
}
