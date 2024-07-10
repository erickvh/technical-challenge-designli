import { Injectable, Logger } from '@nestjs/common';
import * as cheerio from 'cheerio';
import { ParsedMail } from 'mailparser';
import { CustomHttpService } from '../../shared/services/custom-http.service';
import {
  ExtractedJson,
  IJsonExtractStrategy,
  JsonObject,
} from '../interfaces/json-extract-strategy.interface';

@Injectable()
export class ExtractFromWebPageStrategy implements IJsonExtractStrategy {
  private readonly logger = new Logger(ExtractFromWebPageStrategy.name);
  private readonly pagesContent: Record<string, string> = {};

  constructor(private readonly customHttpService: CustomHttpService) {}

  isURLRelative(url: string): boolean {
    return !(url.startsWith('http://') || url.startsWith('https://'));
  }

  async getJson(_parsedEmail: ParsedMail): Promise<ExtractedJson> {
    const jsonObjects = await Promise.all(
      Object.entries(this.pagesContent).map(async ([pageLink, content]) => {
        const document = cheerio.load(content);
        const jsonFiles: string[] = [];

        document('a').each((_, element) => {
          const link = document(element).attr('href');

          if (link && link.endsWith('.json')) {
            jsonFiles.push(
              this.isURLRelative(link) ? new URL(link, pageLink).href : link,
            );
          }
        });

        const jsonObjects = await Promise.all(
          jsonFiles.map(async (link) => {
            return this.customHttpService.get<JsonObject>(link);
          }),
        );

        return jsonObjects;
      }),
    );

    return {
      webpage: jsonObjects.flat(),
    };
  }

  async isValidStrategy(parsedEmail: ParsedMail): Promise<boolean> {
    const html = parsedEmail.html;

    if (!html) {
      return false;
    }

    const document = cheerio.load(html);

    const webpages: string[] = [];

    document('a').each((_, element) => {
      const link = document(element).attr('href');

      if (link && !link.endsWith('.json')) {
        webpages.push(link);
      }
    });

    if (!webpages.length) {
      return false;
    }

    const resposes = await Promise.allSettled(
      webpages.map(async (link) => {
        return {
          response: await this.customHttpService.get<string>(link, {
            headers: {
              'Content-Type': 'text/html',
            },
          }),
          link,
        };
      }),
    );

    resposes.forEach((response) => {
      if (response.status === 'rejected') {
        this.logger.warn(`Failed to fetch webpage content: ${response.reason}`);
        return;
      }

      if (response.value.response.includes('<html')) {
        this.pagesContent[response.value.link] = response.value.response;
      }
    });
    const jsonLinkRegex = /(?<=href=")(.*?\.json)(?=")/g;

    return Object.values(this.pagesContent).some((content) => {
      return jsonLinkRegex.test(content);
    });
  }
}
