import { Inject, Injectable } from '@nestjs/common';
import { simpleParser } from 'mailparser';
import { CustomHttpService } from '../../shared/services/custom-http.service';
import { JSON_EXTRACT_STRATEGIES_PROVIDER } from '../constants/custom-provider.constant';
import { EmailPathDto } from '../dtos/input/email-path.dto';
import { IJsonExtractStrategy } from '../interfaces/json-extract-strategy.interface';

@Injectable()
export class JsonEmailExtractorService {
  constructor(
    private readonly customHttpService: CustomHttpService,
    @Inject(JSON_EXTRACT_STRATEGIES_PROVIDER)
    private readonly strategies: IJsonExtractStrategy[],
  ) {}
  async extractJsonFromEmail(body: EmailPathDto) {
    const { fileUrl } = body;
    const emailBuffer = await this.customHttpService.get<Buffer>(fileUrl, {
      responseType: 'arraybuffer',
    });

    const _parsedEmail = await simpleParser(emailBuffer);

    const strategies = this.strategies.filter((strategy) =>
      strategy.isValidStrategy(_parsedEmail),
    );

    const jsonObjects = await Promise.all(
      strategies.map((strategy) => strategy.getJson(_parsedEmail)),
    );

    return jsonObjects.flat();
  }
}
