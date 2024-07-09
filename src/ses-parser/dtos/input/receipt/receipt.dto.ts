import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEmail,
  IsInt,
  IsString,
  ValidateNested,
} from 'class-validator';
import { VerdictDto } from './verdict.dto';

export class ReceiptDto {
  @IsDateString()
  timestamp: string;

  @IsInt()
  processingTimeMillis: number;

  @IsEmail(undefined, { each: true })
  recipients: string[];

  @ValidateNested()
  @Type(() => VerdictDto)
  spamVerdict: VerdictDto;

  @ValidateNested()
  @Type(() => VerdictDto)
  virusVerdict: VerdictDto;

  @ValidateNested()
  @Type(() => VerdictDto)
  spfVerdict: VerdictDto;

  @ValidateNested()
  @Type(() => VerdictDto)
  dkimVerdict: VerdictDto;

  @ValidateNested()
  @Type(() => VerdictDto)
  dmarcVerdict: VerdictDto;

  @IsString()
  dmarcPolicy: string;
}
