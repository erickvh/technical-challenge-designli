import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ReceiptActionDto {
  @IsString()
  @ApiProperty()
  type: string;

  @IsString()
  @ApiProperty()
  topicArn: string;
}
