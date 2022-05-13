import { InputType, Field } from 'type-graphql'
import { Category } from '@entities/category.entity'
import { IsNotEmpty } from 'class-validator'

@InputType({ description: 'Category input' })
export class CategoryInput implements Partial<Category> {
  @Field({ description: 'Category title' })
  @IsNotEmpty({ message: 'Title is required' })
  title!: string

  @Field({ description: 'Category is active', nullable: true })
  isActive?: boolean
}
