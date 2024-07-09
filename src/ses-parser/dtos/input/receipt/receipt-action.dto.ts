import { IsString } from 'class-validator';

export class ReceiptActionDto {
  @IsString()
  type: string;

  @IsString()
  topicArn: string;
}
