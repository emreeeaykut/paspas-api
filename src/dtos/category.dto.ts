import { Post } from '@entities/post.entity'
import { Field, GraphQLTimestamp, ObjectType } from 'type-graphql'

@ObjectType({ description: 'Category response dto' })
export class CategoryResponseDto {
  @Field(() => String, { description: 'Category id' })
  id!: number

  @Field(() => String, { description: 'Category title' })
  title!: string

  @Field(() => GraphQLTimestamp, { description: 'Category created date' })
  createdAt!: Date

  @Field(() => GraphQLTimestamp, { description: 'Category last update date' })
  updatedAt!: Date

  @Field(() => Boolean, { description: 'Category is active' })
  isActive!: boolean

  @Field(() => [Post], { description: 'Posts of the category' })
  posts!: Post[]
}
