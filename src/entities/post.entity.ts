import { Field, ID, ObjectType } from 'type-graphql'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, RelationId } from 'typeorm'
import { BaseEntity } from './base.entity'
import { Category } from './category.entity'

@ObjectType({ description: 'Post entity' })
@Entity()
export class Post extends BaseEntity {
  @Field(() => ID, { description: 'Post id' })
  @PrimaryGeneratedColumn()
  id!: number

  @Field(() => String, { description: 'Post title' })
  @Column()
  title!: string

  @Field(() => String, { description: 'Post description' })
  @Column()
  description!: string

  @Field(() => String, { description: 'Post content', nullable: true })
  @Column({ nullable: true })
  content?: string

  @Field(() => Category, { description: 'Category of the post' })
  @ManyToOne(() => Category, category => category.posts)
  category!: Category
  @RelationId((post: Post) => post.category)
  categoryId?: number

  @Field(() => String, { description: 'Post image url', nullable: true })
  @Column({ nullable: true })
  img?: string
}
