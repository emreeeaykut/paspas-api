import { InputType, Field } from 'type-graphql'
import { IsNotEmpty } from 'class-validator'
import { Category } from './category.entity'

@InputType({ description: 'Category input' })
export class CategoryInput implements Partial<Category> {
  @Field({ description: 'Category title' })
  @IsNotEmpty({ message: 'Title is required' })
  title!: string

  @Field({ description: 'Category is active', nullable: true })
  isActive?: boolean
}
