import { Body, Controller, Post } from '@nestjs/common';
import { EmailPathDto } from './dtos/input/email-path.dto';
import { JsonEmailExtractorService } from './services/json-email-extractor.service';

@Controller('json-email-extractor')
export class JsonEmailExtractorController {
  constructor(
    private readonly jsonEmailExtractorService: JsonEmailExtractorService,
  ) {}

  @Post()
  extractJsonFromEmail(@Body() body: EmailPathDto) {
    return this.jsonEmailExtractorService.extractJsonFromEmail(body);
  }
}
