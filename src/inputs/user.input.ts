import { InputType, Field } from 'type-graphql'
import { IsNotEmpty } from 'class-validator'
import { User } from '@entities/user.entity'

@InputType({ description: 'User login input' })
export class UserLoginInput implements Partial<User> {
  @Field({ description: 'User email' })
  @IsNotEmpty({ message: 'Email is required' })
  email!: string

  @Field({ description: 'User password' })
  @IsNotEmpty({ message: 'Password is required' })
  password!: string
}

@InputType({ description: 'User register input' })
export class UserRegisterInput extends UserLoginInput implements Partial<User> {
  @Field({ description: 'User email' })
  @IsNotEmpty({ message: 'Email is required' })
  email!: string

  @Field({ description: 'User password' })
  @IsNotEmpty({ message: 'Password is required' })
  password!: string

  @Field({ description: 'User username' })
  @IsNotEmpty({ message: 'Username is required' })
  username!: string

  @Field({ description: 'User firstname' })
  @IsNotEmpty({ message: 'Firstname is required' })
  firstname!: string

  @Field({ description: 'User lastname' })
  @IsNotEmpty({ message: 'Lastname is required' })
  lastname!: string
}

@InputType({ description: 'User register input' })
export class UserInput extends UserRegisterInput implements Partial<User> {
  @Field({ description: 'User is active', nullable: true })
  isActive?: boolean
}
