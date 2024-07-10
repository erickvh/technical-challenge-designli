import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmail, IsString } from 'class-validator';

export class CommonHeadersDto {
  @IsString()
  returnPath: string;

  @IsArray()
  @IsEmail(undefined, { each: true })
  @ApiProperty({ type: [String] })
  from: string[];

  @IsString()
  @ApiProperty()
  date: string;

  @IsArray()
  @IsEmail(undefined, { each: true })
  @ApiProperty({ type: [String] })
  to: string[];

  @IsString()
  @ApiProperty()
  messageId: string;

  @IsString()
  @ApiProperty()
  subject: string;
}
