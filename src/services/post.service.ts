import { Service } from 'typedi'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { Post } from '@entities/post.entity'
import { PostRepository } from '@repositories/post.repository'
import { CategoryRepository } from '@repositories/category.repository'

@Service()
export class PostService {
  constructor(
    @InjectRepository(PostRepository)
    private readonly postRepository: PostRepository,
    @InjectRepository(CategoryRepository)
    private readonly categoryRepository: CategoryRepository
  ) {}

  public async getAll(): Promise<Post[]> {
    return await this.postRepository.find({ relations: ['category'] })
  }

  public async get(id: number): Promise<Post> {
    const entity = await this.postRepository.findOne(id, { relations: ['category'] })

    if (!entity) throw new Error('Post not found')

    return entity
  }

  public async create(data: Partial<Post>): Promise<Post> {
    const category = await this.categoryRepository.findOne(data.categoryId)

    if (!category) throw new Error('Category not found')

    data.category = category

    return await this.postRepository.save(data)
  }

  public async update(id: number, data: Partial<Post>): Promise<Post> {
    const entity = await this.postRepository.findOne(id)

    if (!entity) throw new Error('Post not found')

    const category = await this.categoryRepository.findOne(data.categoryId)

    if (!category) throw new Error('Category not found')

    data.category = category

    Object.assign(entity, data)

    return await this.postRepository.save(entity)
  }

  public async delete(id: number): Promise<Post> {
    const entity = await this.postRepository.findOne(id, { relations: ['category'] })

    if (!entity) throw new Error('Post not found')

    await this.postRepository.delete(id)

    return entity
  }
}
