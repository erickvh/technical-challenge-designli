import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEmail,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CommonHeadersDto } from './common-headers.dto';
import { HeaderDto } from './header.dto';

export class MailDto {
  @IsDate()
  timestamp: Date;

  @IsEmail()
  source: string;

  @IsString()
  messageId: string;

  @IsArray()
  @IsEmail(undefined, { each: true })
  destination: string[];

  @IsBoolean()
  headersTruncated: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => HeaderDto)
  headers: HeaderDto[];

  @ValidateNested()
  @Type(() => CommonHeadersDto)
  commonHeaders: CommonHeadersDto;
}
