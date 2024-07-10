import { Injectable } from '@nestjs/common';
import { EmailPathDto } from '../dtos/input/email-path.dto';

@Injectable()
export class JsonEmailExtractorService {
  constructor() {}

  extractJsonFromEmail(body: EmailPathDto) {
    const _email = body.fileUrl;
  }
}
