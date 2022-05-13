import { Service } from 'typedi'
import { EntityRepository, Repository } from 'typeorm'
import { Category } from '@entities/category.entity'

@Service()
@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
  constructor() {
    super()
  }
}
