import { Injectable } from '@nestjs/common';
import { Comments } from './entities/comments.entity';
import { ResponseCommentDto } from './dto/response-comment.dto';
import { PagingDto } from 'src/paging.dto';
import { CommentsRepository } from './comments.repository';
import { Member } from '../member/entities/member.entity';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private readonly commentsRepository: CommentsRepository) {}

  // 전체 댓글과 답글을 가져오는 메서드
  async findAll(
    page: number,
    size: number = 5,
  ): Promise<PagingDto<ResponseCommentDto[]>> {
    const parentComments: Comments[] =
      await this.commentsRepository.getCommentsByParentId(0n, page, size);
    const totalPages: number = await this.commentsRepository.count();

    // 각 부모 댓글에 대한 답글도 함께 가져옴
    const allComments: ResponseCommentDto[][] = await Promise.all(
      parentComments.map(this.getCommentWithReplies.bind(this)),
    );

    return {
      data: allComments.flat(),
      totalPages,
    };
  }

  private async getCommentWithReplies(
    comment: Comments,
  ): Promise<ResponseCommentDto[]> {
    const replies: Comments[] =
      await this.commentsRepository.getCommentsByParentId(BigInt(comment.id));
    const commentDto: ResponseCommentDto =
      ResponseCommentDto.createResponseDto(comment);
    const replyDtos: ResponseCommentDto[] = replies.map(
      ResponseCommentDto.createResponseDto,
    );
    return [commentDto, ...replyDtos];
  }

  async create(
    createCommentDto: CreateCommentDto,
    member: Member,
  ): Promise<void> {
    const comment: Comments = this.commentsRepository.create({
      body: createCommentDto.body,
      member: member,
      parentId: createCommentDto.parentId.toString(),
    });
    await this.commentsRepository.save(comment);
  }
}
