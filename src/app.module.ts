import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JsonEmailExtractorModule } from './json-email-extractor/json-email-extractor.module';
import { SimpleEmailReceiptModule } from './ses-parser/simple-email-receipt.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SharedModule,
    SimpleEmailReceiptModule,
    JsonEmailExtractorModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
