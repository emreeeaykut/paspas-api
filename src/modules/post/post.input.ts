import { InputType, Field } from 'type-graphql'
import { IsNotEmpty } from 'class-validator'
import { Post } from './post.entity'
import { Category } from '@src/modules/category/category.entity'

@InputType({ description: 'Post input' })
export class PostInput implements Partial<Post> {
  @Field({ description: 'Post title' })
  @IsNotEmpty({ message: 'Title is required' })
  title!: string

  @Field({ description: 'Post description' })
  @IsNotEmpty({ message: 'Description is required' })
  description!: string

  @Field({ description: 'Post content', nullable: true })
  content?: string

  @Field({ description: 'Post is active', nullable: true })
  isActive?: boolean

  @Field(() => Number, { description: 'Post category id' })
  categoryId!: number
  category!: Category

  @Field({ description: 'Post image url', nullable: true })
  img?: string
}
