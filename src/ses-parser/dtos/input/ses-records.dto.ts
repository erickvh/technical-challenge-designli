import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { SesEventRecordDto } from './ses-event-record.dto';

export class SesRecordsDto {
  @IsArray()
  @ValidateNested()
  @Type(() => SesEventRecordDto)
  @ApiProperty({ type: [SesEventRecordDto] })
  Records: SesEventRecordDto[];
}
