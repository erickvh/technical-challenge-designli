import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { MailDto } from './mail/mail.dto';
import { ReceiptDto } from './receipt/receipt.dto';

export class SesDto {
  @ValidateNested()
  @Type(() => ReceiptDto)
  @ApiProperty({ type: ReceiptDto })
  receipt: ReceiptDto;

  @ValidateNested()
  @Type(() => MailDto)
  @ApiProperty({ type: MailDto })
  mail: MailDto;
}
