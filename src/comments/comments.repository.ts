import { Injectable } from '@nestjs/common';
import { Comments } from './entities/comments.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class CommentsRepository extends Repository<Comments> {
  constructor(private dataSource: DataSource) {
    super(Comments, dataSource.createEntityManager());
  }

  // 부모 ID로 댓글을 가져오는 함수 (페이지네이션 가능)
  async getCommentsByParentId(
    parentId: string,
    page?: number,
    size?: number,
  ): Promise<Comments[]> {
    const query = this.createQueryBuilder('comments')
      .leftJoinAndSelect('comments.member', 'member')
      .where('comments.parentId = :parentId', { parentId })
      .orderBy('comments.id', 'DESC');

    if (page !== undefined && size !== undefined) {
      query.skip((page - 1) * size).take(size);
    }

    return await query.getMany();
  }
}
