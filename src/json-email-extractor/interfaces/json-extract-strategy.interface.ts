export interface IJsonExtractStrategy {
  getJson(): Promise<unknown>;
  isValidStrategy(): boolean;
}
