import { ApiProperty } from '@nestjs/swagger';

export class PagingDto<T> {
  @ApiProperty({ description: '페이지에 표시될 데이터' })
  data: T;

  @ApiProperty({ description: '전체 페이지 수' })
  totalPages: number;
}
