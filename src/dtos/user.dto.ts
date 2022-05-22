import { User } from '@entities/user.entity'
import { Field, ObjectType } from 'type-graphql'

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
