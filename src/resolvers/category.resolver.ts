import { Arg, Args, Mutation, Query, Resolver } from 'type-graphql'
import { CategoryService } from '@services/category.service'
import { Category } from '@entities/category.entity'
import { CategoryInput } from '@inputs/category.input'
import { CategoryResponseDto } from 'src/dtos/category.dto'
import { PaginationArgs } from '@common/args/pagination.args'

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Query(() => [Category], { description: 'Get all categories' })
  public async categories(@Args() pagination?: PaginationArgs): Promise<CategoryResponseDto[]> {
    return await this.categoryService.getAll(pagination)
  }

  @Query(() => Number, { description: 'Get total categories' })
  public async postTotal(): Promise<Number> {
    return await this.categoryService.getTotal()
  }

  @Query(() => Category, { description: 'Get category by id' })
  public async category(@Arg('id') id: number): Promise<CategoryResponseDto> {
    return await this.categoryService.get(id)
  }

  @Mutation(() => Category, { description: 'Create category' })
  public async createCategory(@Arg('data') data: CategoryInput): Promise<CategoryResponseDto> {
    return await this.categoryService.create(data)
  }

  @Mutation(() => Category, { description: 'Update category' })
  public async updateCategory(@Arg('id') id: number, @Arg('data') data: CategoryInput): Promise<CategoryResponseDto> {
    return await this.categoryService.update(id, data)
  }

  @Mutation(() => Category, { description: 'Delete category' })
  public async deleteCategory(@Arg('id') id: number): Promise<CategoryResponseDto> {
    return await this.categoryService.delete(id)
  }
}
