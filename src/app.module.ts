import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SimpleEmailReceiptModule } from './ses-parser/simple-email-receipt.module';

@Module({
  imports: [ConfigModule.forRoot(), SimpleEmailReceiptModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
