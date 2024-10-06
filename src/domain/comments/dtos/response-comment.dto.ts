import { Role } from 'src/domain/member/entities/member.entity';
import { Comments } from '../comments.entity';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseCommentDto {
  @ApiProperty({ description: '방명록 ID' })
  id: number;

  @ApiProperty({ description: '방명록 내용' })
  body: string;

  @ApiProperty({ description: '상위 방명록 ID (없으면 0)' })
  parentId: number;

  @ApiProperty({ description: '작성자 ID' })
  memberId: number;

  @ApiProperty({ description: '작성자 이름' })
  username: string;

  @ApiProperty({
    description: '작성자 권한',
    enum: Role,
    enumName: 'Role',
  })
  role: Role;

  @ApiProperty({ description: '작성 날짜' })
  regDate: Date;

  static createResponseDto(comment: Comments): ResponseCommentDto {
    const responseDto = new ResponseCommentDto();
    responseDto.id = Number(comment.id);
    responseDto.body = comment.body;
    responseDto.parentId = Number(comment.parentId); // Convert to number
    responseDto.memberId = Number(comment.member.id);
    responseDto.username = comment.member.username;
    responseDto.role = comment.member.role;
    responseDto.regDate = comment.createdDate;

    return responseDto;
  }
}
