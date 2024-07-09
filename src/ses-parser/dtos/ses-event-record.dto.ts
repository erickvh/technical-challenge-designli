import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';
import { MailDto } from './mail/mail.dto';
import { ReceiptDto } from './receipt/receipt.dto';

export class SesEventRecordDto {
  @ValidateNested()
  @Type(() => ReceiptDto)
  receipt: ReceiptDto;

  @ValidateNested()
  @Type(() => MailDto)
  mail: MailDto;

  @IsString()
  eventSource: string;
}
