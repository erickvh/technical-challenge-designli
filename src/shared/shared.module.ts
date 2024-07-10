import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { CustomHttpService } from './services/custom-http.service';

@Global()
@Module({
  imports: [HttpModule],
  controllers: [],
  providers: [CustomHttpService],
  exports: [CustomHttpService],
})
export class SharedModule {}
