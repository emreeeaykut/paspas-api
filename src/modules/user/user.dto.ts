import { Field, GraphQLTimestamp, ObjectType } from 'type-graphql'
import { User } from './user.entity'

@ObjectType({ description: 'User response dto' })
export class UserResponseDto {
  @Field(() => String, { description: 'User id' })
  id!: number

  @Field(() => String, { description: 'User email' })
  email!: string

  @Field(() => String, { description: 'User username' })
  username!: string

  @Field(() => String, { description: 'User firstname' })
  firstname!: string

  @Field(() => String, { description: 'User lastname' })
  lastname!: string

  @Field(() => GraphQLTimestamp, { description: 'User created date' })
  createdAt!: Date

  @Field(() => GraphQLTimestamp, { description: 'User last update date' })
  updatedAt!: Date

  @Field(() => Boolean, { description: 'User is active' })
  isActive!: boolean
}

@ObjectType({ description: 'User register response dto' })
export class UserRegisterResponseDto {
  @Field(() => String, { description: 'User register acces token' })
  accessToken!: string

  @Field(() => User, { description: 'User register user' })
  user!: User
}

@ObjectType({ description: 'User login response dto' })
export class UserLoginResponseDto {
  @Field(type => String, { description: 'User login acces token' })
  accessToken!: string

  @Field(() => User, { description: 'User login user' })
  user!: User
}
