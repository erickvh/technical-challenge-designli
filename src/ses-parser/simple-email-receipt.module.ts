import { Module } from '@nestjs/common';
import { SimpleEmailReceiptService } from './services/simple-email-receipt.service';
import { SimpleEmailReceiptController } from './simple-email-receipt.controller';

@Module({
  imports: [],
  controllers: [SimpleEmailReceiptController],
  providers: [SimpleEmailReceiptService],
})
export class SimpleEmailReceiptModule {}
