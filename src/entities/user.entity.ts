import { Field, ID, ObjectType } from 'type-graphql'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { BaseEntity } from './base.entity'

@ObjectType({ description: 'User entity' })
@Entity()
export class User extends BaseEntity {
  @Field(() => ID, { description: 'User id' })
  @PrimaryGeneratedColumn()
  id!: number

  @Field(() => String, { description: 'User email' })
  @Column()
  email!: string

  @Field(() => String, { description: 'User password' })
  @Column()
  password!: string

  @Field(() => String, { description: 'User username' })
  @Column()
  username!: string

  @Field(() => String, { description: 'User firstname' })
  @Column()
  firstname!: string

  @Field(() => String, { description: 'User lastname' })
  @Column()
  lastname!: string
}
