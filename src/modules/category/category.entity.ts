import { Field, ID, ObjectType } from 'type-graphql'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { BaseEntity } from '@src/common/entities/base.entity'
import { Post } from '@src/modules/post/post.entity'

@ObjectType({ description: 'Category entity' })
@Entity()
export class Category extends BaseEntity {
  @Field(() => ID, { description: 'Category id' })
  @PrimaryGeneratedColumn()
  id!: number

  @Field(() => String, { description: 'Category title' })
  @Column()
  title!: string

  @Field(() => [Post], { description: 'Posts of the category' })
  @OneToMany(() => Post, post => post.category)
  posts!: Post[]
}
