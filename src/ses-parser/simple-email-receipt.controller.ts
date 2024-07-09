import { Body, Controller, Post } from '@nestjs/common';
import { SesRecordsDto } from './dtos/ses-records.dto';

@Controller('ses-parser')
export class SimpleEmailReceiptController {
  @Post()
  async getParsedEmail(@Body() sesRecords: SesRecordsDto) {
    return sesRecords;
  }
}
