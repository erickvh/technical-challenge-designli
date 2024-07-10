import { Module } from '@nestjs/common';
import { JsonEmailExtractorController } from './json-email-extractor.controller';
import { JsonEmailExtractorService } from './services/json-email-extractor.service';

@Module({
  providers: [JsonEmailExtractorService],
  controllers: [JsonEmailExtractorController],
})
export class JsonEmailExtractorModule {}
