import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { CategoryService } from '@services/category.service'
import { Category } from '@entities/category.entity'
import { CategoryInput } from '@inputs/category.input'
import { CategoryResponseDto } from 'src/dtos/category.dto'

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Query(() => [Category], { description: 'Get all categories' })
  public async categories(): Promise<Category[]> {
    return await this.categoryService.getAll()
  }

  @Query(() => Category, { description: 'Get category by id' })
  public async category(@Arg('id') id: number): Promise<CategoryResponseDto> {
    return await this.categoryService.get(id)
  }

  @Mutation(() => Category, { description: 'Create category' })
  public async createCategory(@Arg('data') data: CategoryInput): Promise<Category> {
    return await this.categoryService.create(data)
  }

  @Mutation(() => Category, { description: 'Update category' })
  public async updateCategory(@Arg('id') id: number, @Arg('data') data: CategoryInput): Promise<Category> {
    return await this.categoryService.update(id, data)
  }

  @Mutation(() => Category, { description: 'Delete category' })
  public async deleteCategory(@Arg('id') id: number): Promise<Category> {
    return await this.categoryService.delete(id)
  }
}
