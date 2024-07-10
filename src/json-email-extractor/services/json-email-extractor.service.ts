import { Injectable } from '@nestjs/common';
import { simpleParser } from 'mailparser';
import { CustomHttpService } from '../../shared/services/custom-http.service';
import { EmailPathDto } from '../dtos/input/email-path.dto';

@Injectable()
export class JsonEmailExtractorService {
  constructor(private readonly customHttpService: CustomHttpService) {}
  async extractJsonFromEmail(body: EmailPathDto) {
    const { fileUrl } = body;
    const emailBuffer = await this.customHttpService.get<Buffer>(fileUrl, {
      responseType: 'arraybuffer',
    });

    const _parsedEmail = await simpleParser(emailBuffer);
  }
}
