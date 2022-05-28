import { Service } from 'typedi'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { CategoryRepository } from '@repositories/category.repository'
import { CategoryResponseDto } from 'src/dtos/category.dto'
import { CategoryMapper } from 'src/mappers/category.mapper'
import { CategoryInput } from '@inputs/category.input'
import { PaginationArgs } from '@common/args/pagination.args'

@Service()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryRepository)
    private readonly categoryRepository: CategoryRepository
  ) {}

  public async getAll(pagination?: PaginationArgs): Promise<CategoryResponseDto[]> {
    const entities = await this.categoryRepository.getAll(pagination)

    return await Promise.all(entities.map(CategoryMapper.toDto))
  }

  public async getTotal(): Promise<number> {
    return await this.categoryRepository.count()
  }

  public async get(id: number): Promise<CategoryResponseDto> {
    const entity = await this.categoryRepository.findOne(id)

    if (!entity) throw new Error('Category not found')

    return CategoryMapper.toDto(entity)
  }

  public async create(data: CategoryInput): Promise<CategoryResponseDto> {
    let entity = CategoryMapper.toCreateEntity(data)

    entity = await this.categoryRepository.save(entity)

    return CategoryMapper.toDto(entity)
  }

  public async update(id: number, data: CategoryInput): Promise<CategoryResponseDto> {
    let entity = await this.categoryRepository.findOne(id)

    if (!entity) throw new Error('Category not found')

    entity = CategoryMapper.toUpdateEntity(entity, data)

    entity = await this.categoryRepository.save(entity)

    return CategoryMapper.toDto(entity)
  }

  public async delete(id: number): Promise<CategoryResponseDto> {
    const entity = await this.categoryRepository.findOne(id)

    if (!entity) throw new Error('Category not found')

    await this.categoryRepository.delete(id)

    return CategoryMapper.toDto(entity)
  }
}
