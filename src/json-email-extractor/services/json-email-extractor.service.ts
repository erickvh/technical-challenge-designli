import { Inject, Injectable } from '@nestjs/common';
import { simpleParser } from 'mailparser';
import { CustomHttpService } from '../../shared/services/custom-http.service';
import { JSON_EXTRACT_STRATEGIES_PROVIDER } from '../constants/custom-provider.constant';
import { EmailPathDto } from '../dtos/input/email-path.dto';
import {
  ExtractedJson,
  IJsonExtractStrategy,
} from '../interfaces/json-extract-strategy.interface';

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

    const parsedEmail = await simpleParser(emailBuffer);

    const strategies = await Promise.all(
      this.strategies.map(async (strategy) => ({
        isValid: await strategy.isValidStrategy(parsedEmail),
        strategy,
      })),
    );

    const validStrategies = strategies.filter(({ isValid }) => isValid);

    const jsonObjects = await Promise.all(
      validStrategies.map(({ strategy }) => strategy.getJson(parsedEmail)),
    );

    return jsonObjects.reduce(
      (acc, curr) => ({ ...acc, ...curr }),
      {},
    ) as ExtractedJson;
  }
}
