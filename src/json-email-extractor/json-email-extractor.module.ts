import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { JsonEmailExtractorController } from './json-email-extractor.controller';
import { JsonEmailExtractorService } from './services/json-email-extractor.service';

@Module({
  imports: [HttpModule],
  providers: [JsonEmailExtractorService],
  controllers: [JsonEmailExtractorController],
})
export class JsonEmailExtractorModule {}
