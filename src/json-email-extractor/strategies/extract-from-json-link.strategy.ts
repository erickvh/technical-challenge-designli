import { Injectable } from '@nestjs/common';
import * as cheerio from 'cheerio';
import { ParsedMail } from 'mailparser';
import { CustomHttpService } from '../../shared/services/custom-http.service';
import {
  ExtractedJson,
  IJsonExtractStrategy,
  JsonObject,
} from '../interfaces/json-extract-strategy.interface';

@Injectable()
export class ExtractFromJsonLinkStrategy implements IJsonExtractStrategy {
  constructor(private readonly customHttpService: CustomHttpService) {}

  async getJson(parsedEmail: ParsedMail): Promise<ExtractedJson> {
    const jsonFiles = [];

    const html = parsedEmail.html || '';

    const document = cheerio.load(html);

    document('a').each((_, element) => {
      const link = document(element).attr('href');

      if (link && link.endsWith('.json')) {
        jsonFiles.push(link);
      }
    });

    const jsonObjects = await Promise.all(
      jsonFiles.map(async (link) => {
        return this.customHttpService.get<JsonObject>(link);
      }),
    );

    return {
      'json-link': jsonObjects,
    };
  }

  isValidStrategy(parsedEmail: ParsedMail): boolean {
    const html = parsedEmail.html;

    if (!html) {
      return false;
    }

    const jsonLinkRegex = /(?<=href=")(.*?\.json)(?=")/g;

    return jsonLinkRegex.test(html);
  }
}
