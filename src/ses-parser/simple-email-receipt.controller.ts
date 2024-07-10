import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { SesRecordsDto } from './dtos/input/ses-records.dto';
import { HumanizedSesDto } from './dtos/output/humanized-ses.dto';
import { SimpleEmailReceiptService } from './services/simple-email-receipt.service';

@Controller('ses-events-parser')
export class SimpleEmailReceiptController {
  constructor(
    private readonly simpleEmailReceiptService: SimpleEmailReceiptService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Parse SES events',
    type: HumanizedSesDto,
    isArray: true,
  })
  getPasesSesEvents(@Body() sesRecords: SesRecordsDto): HumanizedSesDto[] {
    return this.simpleEmailReceiptService.parseSesEvents(sesRecords);
  }
}
