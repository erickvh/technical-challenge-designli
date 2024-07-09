import { IsEnum } from 'class-validator';
import { VerdictStatus } from '../../../enums/verdict-status.enum';

export class VerdictDto {
  @IsEnum(VerdictStatus)
  status: VerdictStatus;
}
