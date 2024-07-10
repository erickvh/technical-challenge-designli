import { ApiProperty } from '@nestjs/swagger';
import { SourceEnum } from '../../enum/source.enum';

export class MergedCombinedJsonDto {
  @ApiProperty({
    type: [Object],
    description: 'The extracted JSON from the attachment',
  })
  [SourceEnum.ATTACHMENT]: object[];
  @ApiProperty({
    type: [Object],
    description: 'The extracted JSON from the link',
  })
  [SourceEnum.LINK]: object[];

  @ApiProperty({
    type: [Object],
    description: 'The extracted JSON from the webpage',
  })
  [SourceEnum.WEBPAGE]: object[];
}
