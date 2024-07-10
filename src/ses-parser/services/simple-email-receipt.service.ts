import { Injectable } from '@nestjs/common';
import { VerdictDto } from '../dtos/input/receipt/verdict.dto';
import { SesRecordsDto } from '../dtos/input/ses-records.dto';
import { HumanizedSesDto } from '../dtos/output/humanized-ses.dto';
import { VerdictStatus } from '../enums/verdict-status.enum';

@Injectable()
export class SimpleEmailReceiptService {
  constructor() {}

  private hasPassVerdict(verdict: VerdictDto): boolean {
    return verdict.status === VerdictStatus.PASS;
  }

  private hasDnsPassVerdict(
    spf: VerdictDto,
    dkim: VerdictDto,
    dmarc: VerdictDto,
  ): boolean {
    return (
      this.hasPassVerdict(spf) &&
      this.hasPassVerdict(dkim) &&
      this.hasPassVerdict(dmarc)
    );
  }

  private getEmailDate(timestamp: string): string {
    return new Date(timestamp).toLocaleString('es-SV', {
      month: 'long',
    });
  }

  private isEmailDelayed(processingTimeMillis: number): boolean {
    return processingTimeMillis > 1000;
  }

  private getRecepientUsername(email: string): string {
    return email.split('@')[0];
  }

  public parseSesEvents(sesRecords: SesRecordsDto): HumanizedSesDto[] {
    return sesRecords.Records.map(({ ses }) => {
      return {
        spam: this.hasPassVerdict(ses.receipt.spamVerdict),
        virus: this.hasPassVerdict(ses.receipt.virusVerdict),
        dns: this.hasDnsPassVerdict(
          ses.receipt.spfVerdict,
          ses.receipt.dkimVerdict,
          ses.receipt.dmarcVerdict,
        ),
        mes: this.getEmailDate(ses.mail.timestamp),
        retrasado: this.isEmailDelayed(ses.receipt.processingTimeMillis),
        emisor: this.getRecepientUsername(ses.mail.source),
        receptor: ses.mail.destination.map(this.getRecepientUsername),
      };
    });
  }
}
