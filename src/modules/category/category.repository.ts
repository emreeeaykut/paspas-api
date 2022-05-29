import { Service } from 'typedi'
import { EntityRepository, Repository } from 'typeorm'
import { Category } from './category.entity'
import { PaginationArgs } from '@src/common/args/pagination.args'

@Service()
@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
  public async getAll(pagination?: PaginationArgs) {
    const take = pagination?.limit || 10
    const page = pagination?.page || 1
    const skip = (page - 1) * take
    const orderByFieldName = pagination?.orderByFieldName || 'id'
    const orderByDirection = pagination?.orderByDirection || 'ASC'

    const result = await this.createQueryBuilder('category')
      .take(take)
      .skip(skip)
      .orderBy(`category.${orderByFieldName}`, orderByDirection)
      .getMany()

    return result
  }
}
