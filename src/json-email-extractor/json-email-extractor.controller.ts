import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { EmailPathDto } from './dtos/input/email-path.dto';
import { MergedCombinedJsonDto } from './dtos/output/merged-combined-json.dto';
import { ExtractedJson } from './interfaces/json-extract-strategy.interface';
import { JsonEmailExtractorService } from './services/json-email-extractor.service';

@Controller('json-email-extractor')
export class JsonEmailExtractorController {
  constructor(
    private readonly jsonEmailExtractorService: JsonEmailExtractorService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Extract JSON from email',
    type: MergedCombinedJsonDto,
  })
  extractJsonFromEmail(@Body() body: EmailPathDto): Promise<ExtractedJson> {
    return this.jsonEmailExtractorService.extractJsonFromEmail(body);
  }
}
