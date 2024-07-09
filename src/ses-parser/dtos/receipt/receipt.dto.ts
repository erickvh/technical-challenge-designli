import { VerdictDto } from './verdict.dto';

export class ReceiptDto {
  timestamp: string;

  processingTimeMillis: number;

  recipients: string[];

  spamVerdict: VerdictDto;

  virusVerdict: VerdictDto;

  spfVerdict: VerdictDto;

  dkimVerdict: VerdictDto;

  dmarcVerdict: VerdictDto;

  dmarcPolicy: string;
}
