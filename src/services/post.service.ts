import { Service } from 'typedi'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { PostRepository } from '@repositories/post.repository'
import { CategoryRepository } from '@repositories/category.repository'
import { PostResponseDto } from '@dtos/post.dto'
import { PostMapper } from '@mappers/post.mapper'
import { PostInput } from '@inputs/post.input'

@Service()
export class PostService {
  constructor(
    @InjectRepository(PostRepository)
    private readonly postRepository: PostRepository,
    @InjectRepository(CategoryRepository)
    private readonly categoryRepository: CategoryRepository
  ) {}

  public async getAll(): Promise<PostResponseDto[]> {
    const entities = await this.postRepository.find({ relations: ['category'] })

    return await Promise.all(entities.map(PostMapper.toDto))
  }

  public async get(id: number): Promise<PostResponseDto> {
    const entity = await this.postRepository.findOne(id, { relations: ['category'] })

    if (!entity) throw new Error('Post not found')

    return PostMapper.toDto(entity)
  }

  public async create(data: PostInput): Promise<PostResponseDto> {
    const { categoryId } = data

    const category = await this.categoryRepository.findOne(categoryId)

    if (!category) throw new Error('Category not found')

    data.category = category

    let entity = PostMapper.toCreateEntity(data)

    entity = await this.postRepository.save(entity)

    return PostMapper.toDto(entity)
  }

  public async update(id: number, data: PostInput): Promise<PostResponseDto> {
    const { categoryId } = data

    let entity = await this.postRepository.findOne(id)

    if (!entity) throw new Error('Post not found')

    const category = await this.categoryRepository.findOne(categoryId)

    if (!category) throw new Error('Category not found')

    data.category = category

    entity = PostMapper.toUpdateEntity(entity, data)

    entity = await this.postRepository.save(entity)

    return PostMapper.toDto(entity)
  }

  public async delete(id: number): Promise<PostResponseDto> {
    const entity = await this.postRepository.findOne(id, { relations: ['category'] })

    if (!entity) throw new Error('Post not found')

    await this.postRepository.delete(id)

    return entity
  }
}
