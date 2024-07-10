import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  timestamp: string;

  @IsInt()
  @ApiProperty({ type: 'integer' })
  processingTimeMillis: number;

  @IsEmail(undefined, { each: true })
  @ApiProperty({ type: 'array', items: { type: 'string', format: 'email' } })
  recipients: string[];

  @ValidateNested()
  @Type(() => VerdictDto)
  @ApiProperty({ type: VerdictDto })
  spamVerdict: VerdictDto;

  @ValidateNested()
  @Type(() => VerdictDto)
  @ApiProperty({ type: VerdictDto })
  virusVerdict: VerdictDto;

  @ValidateNested()
  @Type(() => VerdictDto)
  @ApiProperty({ type: VerdictDto })
  spfVerdict: VerdictDto;

  @ValidateNested()
  @Type(() => VerdictDto)
  @ApiProperty({ type: VerdictDto })
  dkimVerdict: VerdictDto;

  @ValidateNested()
  @Type(() => VerdictDto)
  @ApiProperty({ type: VerdictDto })
  dmarcVerdict: VerdictDto;

  @IsString()
  @ApiProperty()
  dmarcPolicy: string;
}
