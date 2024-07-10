import { IsUrl } from 'class-validator';

export class EmailPathDto {
  @IsUrl()
  fileUrl: string;
}
