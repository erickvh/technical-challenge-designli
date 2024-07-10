import { ParsedMail } from 'mailparser';
import { SourceEnum } from '../enum/source.enum';

export type JsonObject = { [key: string]: unknown };

type AtLeastOne<T> = {
  [K in keyof T]-?: Partial<T> & Pick<T, K>;
}[keyof T];

export type ExtractedJson = AtLeastOne<{
  [key in `${SourceEnum}`]: JsonObject[];
}>;
export interface IJsonExtractStrategy {
  getJson(parsedEmail: ParsedMail): Promise<ExtractedJson>;
  isValidStrategy(parsedEmail: ParsedMail): boolean | Promise<boolean>;
}
