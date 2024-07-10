import { ParsedMail } from 'mailparser';

export type JsonObject = { [key: string]: unknown };
export enum SourceEnum {
  ATTACHMENT = 'attachment',
  LINK = 'json-link',
  WEBPAGE = 'webpage',
}

type AtLeastOne<T> = {
  [K in keyof T]-?: Partial<T> & Pick<T, K>;
}[keyof T];

export type ExtractedJson = AtLeastOne<{
  [key in `${SourceEnum}`]: JsonObject[];
}>;
export interface IJsonExtractStrategy {
  getJson(parsedEmail: ParsedMail): Promise<ExtractedJson>;
  isValidStrategy(parsedEmail: ParsedMail): boolean;
}
