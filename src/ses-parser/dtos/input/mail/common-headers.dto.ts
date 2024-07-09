import { IsArray, IsEmail, IsString } from 'class-validator';

export class CommonHeadersDto {
  @IsString()
  returnPath: string;

  @IsArray()
  @IsEmail(undefined, { each: true })
  from: string[];

  @IsString()
  date: string;

  @IsArray()
  @IsEmail(undefined, { each: true })
  to: string[];

  @IsString()
  messageId: string;

  @IsString()
  subject: string;
}
