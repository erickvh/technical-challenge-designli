import { Module } from '@nestjs/common';
import { SimpleEmailReceiptController } from './simple-email-receipt.controller';

@Module({
  imports: [],
  controllers: [SimpleEmailReceiptController],
  providers: [],
})
export class SimpleEmailReceiptModule {}
