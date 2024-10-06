import { ApiProperty } from '@nestjs/swagger';

export class UpdateCommentDto {
  @ApiProperty({ description: '방명록 id' })
  id: number;

  @ApiProperty({ description: '방명록 내용' })
  body: string;

  @ApiProperty({ description: '상위 방명록 ID' })
  parentId: number;
}
