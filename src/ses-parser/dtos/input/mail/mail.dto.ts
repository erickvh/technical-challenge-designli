import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEmail,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CommonHeadersDto } from './common-headers.dto';
import { HeaderDto } from './header.dto';

export class MailDto {
  @IsDateString()
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  timestamp: string;

  @IsEmail()
  @ApiProperty()
  source: string;

  @IsString()
  @ApiProperty()
  messageId: string;

  @IsArray()
  @IsEmail(undefined, { each: true })
  @ApiProperty({ type: [String] })
  destination: string[];

  @IsBoolean()
  @ApiProperty()
  headersTruncated: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => HeaderDto)
  @ApiProperty({ type: [HeaderDto] })
  headers: HeaderDto[];

  @ValidateNested()
  @Type(() => CommonHeadersDto)
  @ApiProperty({ type: CommonHeadersDto })
  commonHeaders: CommonHeadersDto;
}
