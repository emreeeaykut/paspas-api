import { Service } from 'typedi'
import { EntityRepository, Repository } from 'typeorm'
import { Post } from '@entities/post.entity'
import { PaginationArgs } from '@common/args/pagination.args'

@Service()
@EntityRepository(Post)
export class PostRepository extends Repository<Post> {
  public async getAll(pagination?: PaginationArgs) {
    const take = pagination?.limit || 10
    const page = pagination?.page || 1
    const skip = (page - 1) * take
    const orderByFieldName = pagination?.orderByFieldName || 'id'
    const orderByDirection = pagination?.orderByDirection || 'ASC'

    const result = await this.createQueryBuilder('post')
      .leftJoinAndSelect('post.category', 'category')
      .take(take)
      .skip(skip)
      .orderBy(`post.${orderByFieldName}`, orderByDirection)
      .getMany()

    return result
  }
}
