import { Body, Controller, Post } from '@nestjs/common';
import { SesRecordsDto } from './dtos/input/ses-records.dto';
import { HumanizedSesDto } from './dtos/output/humanized-ses.dto';
import { SimpleEmailReceiptService } from './services/simple-email-receipt.service';

@Controller('ses-events-parser')
export class SimpleEmailReceiptController {
  constructor(
    private readonly simpleEmailReceiptService: SimpleEmailReceiptService,
  ) {}

  @Post()
  getPasesSesEvents(@Body() sesRecords: SesRecordsDto): HumanizedSesDto[] {
    return this.simpleEmailReceiptService.parseSesEvents(sesRecords);
  }
}
