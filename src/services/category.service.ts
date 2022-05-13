import { Service } from 'typedi'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { Category } from '@entities/category.entity'
import { CategoryRepository } from '@repositories/category.repository'

@Service()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryRepository)
    private readonly categoryRepository: CategoryRepository
  ) {}

  public async getAll(): Promise<Category[]> {
    return await this.categoryRepository.find()
  }

  public async get(id: number): Promise<Category> {
    const entity = await this.categoryRepository.findOne(id)

    if (!entity) throw new Error('Category not found')

    return entity
  }

  public async create(data: Partial<Category>): Promise<Category> {
    return await this.categoryRepository.save(data)
  }

  public async update(id: number, data: Partial<Category>): Promise<Category> {
    const entity = await this.categoryRepository.findOne(id)

    if (!entity) throw new Error('Category not found')

    Object.assign(entity, data)

    return await this.categoryRepository.save(entity)
  }

  public async delete(id: number): Promise<Category> {
    const entity = await this.categoryRepository.findOne(id)

    if (!entity) throw new Error('Category not found')

    await this.categoryRepository.delete(id)

    return entity
  }
}
