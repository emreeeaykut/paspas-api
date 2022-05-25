import { Category } from '@entities/category.entity'
import { Field, GraphQLTimestamp, ObjectType } from 'type-graphql'

@ObjectType({ description: 'Post response dto' })
export class PostResponseDto {
  @Field(() => String, { description: 'Post id' })
  id!: number

  @Field(() => String, { description: 'Post title' })
  title!: string

  @Field(() => String, { description: 'Post description' })
  description!: string

  @Field(() => String, { description: 'Post content', nullable: true })
  content?: string

  @Field(() => String, { description: 'Post image url', nullable: true })
  img?: string

  @Field(() => Category, { description: 'Post category' })
  category!: Category

  @Field(() => GraphQLTimestamp, { description: 'Post created date' })
  createdAt!: Date

  @Field(() => GraphQLTimestamp, { description: 'Post last update date' })
  updatedAt!: Date

  @Field(() => Boolean, { description: 'Post is active' })
  isActive!: boolean
}
