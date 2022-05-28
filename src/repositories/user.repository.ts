import { Service } from 'typedi'
import { EntityRepository, Repository } from 'typeorm'
import { User } from '@entities/user.entity'
import { PaginationArgs } from '@common/args/pagination.args'

@Service()
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  public async getAll(pagination?: PaginationArgs) {
    const take = pagination?.limit || 10
    const page = pagination?.page || 1
    const skip = (page - 1) * take
    const orderByFieldName = pagination?.orderByFieldName || 'id'
    const orderByDirection = pagination?.orderByDirection || 'ASC'

    const result = await this.createQueryBuilder('user')
      .take(take)
      .skip(skip)
      .orderBy(`user.${orderByFieldName}`, orderByDirection)
      .getMany()

    return result
  }
}
