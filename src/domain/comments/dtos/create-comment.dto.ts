import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({ description: '방명록 내용' })
  body: string;

  @ApiProperty({ description: '상위 방명록 ID' })
  parentId?: number = 0;
}
