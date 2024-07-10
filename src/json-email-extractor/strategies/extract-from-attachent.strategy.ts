import { Injectable } from '@nestjs/common';
import { ParsedMail } from 'mailparser';
import {
  ExtractedJson,
  IJsonExtractStrategy,
} from '../interfaces/json-extract-strategy.interface';

@Injectable()
export class ExtractFromAttachmentStrategy implements IJsonExtractStrategy {
  async getJson(parsedEmail: ParsedMail): Promise<ExtractedJson> {
    const jsonAttachments = parsedEmail.attachments.filter(
      (attachment) => attachment.contentType === 'application/json',
    );

    const jsonObjects = await Promise.all(
      jsonAttachments.map(async (attachment) => {
        return JSON.parse(attachment.content.toString());
      }),
    );

    return {
      attachment: jsonObjects,
    };
  }

  isValidStrategy(parsedEmail: ParsedMail): boolean {
    if (parsedEmail.attachments.length === 0) {
      return false;
    }

    const hasJsonAttached = parsedEmail.attachments.some((attachment) => {
      return attachment.contentType === 'application/json';
    });

    return hasJsonAttached;
  }
}
