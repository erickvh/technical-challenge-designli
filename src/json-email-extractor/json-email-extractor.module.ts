import { Module } from '@nestjs/common';
import { JSON_EXTRACT_STRATEGIES_PROVIDER } from './constants/custom-provider.constant';
import { IJsonExtractStrategy } from './interfaces/json-extract-strategy.interface';
import { JsonEmailExtractorController } from './json-email-extractor.controller';
import { JsonEmailExtractorService } from './services/json-email-extractor.service';
import { ExtractFromAttachmentStrategy } from './strategies/extract-from-attachent.strategy';
import { ExtractFromJsonLinkStrategy } from './strategies/extract-from-json-link.strategy';

const strategies = [ExtractFromAttachmentStrategy, ExtractFromJsonLinkStrategy];

const customJsonStrategiesProvider = {
  provide: JSON_EXTRACT_STRATEGIES_PROVIDER,
  useFactory: (...strategies: IJsonExtractStrategy[]) => [...strategies],
  inject: strategies,
};
@Module({
  imports: [],
  providers: [
    JsonEmailExtractorService,
    ...strategies,
    customJsonStrategiesProvider,
  ],
  controllers: [JsonEmailExtractorController],
})
export class JsonEmailExtractorModule {}
