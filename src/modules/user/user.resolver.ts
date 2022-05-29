import { Arg, Args, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql'
import { UserService } from './user.service'
import { User } from './user.entity'
import { UserInput, UserRegisterInput, UserLoginInput } from './user.input'
import { UserLoginResponseDto, UserRegisterResponseDto, UserResponseDto } from './user.dto'
import { AuthContext } from '@src/contexts/auth.context'
import { isAuth } from '@src/middlewares/is-auth.middleware'
import { PaginationArgs } from '@src/common/args/pagination.args'

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User], { description: 'Get all users' })
  public async users(@Args() pagination?: PaginationArgs): Promise<UserResponseDto[]> {
    return await this.userService.getAll(pagination)
  }

  @Query(() => Number, { description: 'Get total users' })
  public async postTotal(): Promise<Number> {
    return await this.userService.getTotal()
  }

  @Query(() => User, { description: 'Get user by id' })
  public async user(@Arg('id') id: number): Promise<UserResponseDto> {
    return await this.userService.get(id)
  }

  @Mutation(() => User, { description: 'Create user' })
  public async createUser(@Arg('data') data: UserInput): Promise<UserResponseDto> {
    return await this.userService.create(data)
  }

  @Mutation(() => User, { description: 'Update user' })
  public async updateUser(@Arg('id') id: number, @Arg('data') data: UserInput): Promise<UserResponseDto> {
    return await this.userService.update(id, data)
  }

  @Mutation(() => User, { description: 'Delete user' })
  public async deleteUser(@Arg('id') id: number): Promise<UserResponseDto> {
    return await this.userService.delete(id)
  }

  @Query(() => User, { description: 'Get user info with context' })
  @UseMiddleware(isAuth)
  public async infoUser(@Ctx() { payload }: AuthContext): Promise<UserResponseDto> {
    if (!payload?.user?.id) throw new Error('User id not found')

    const {
      user: { id },
    } = payload

    return await this.userService.get(id)
  }

  @Mutation(() => UserRegisterResponseDto, { description: 'Register user' })
  public async registerUser(
    @Arg('data') data: UserRegisterInput,
    @Ctx() { res }: AuthContext
  ): Promise<UserRegisterResponseDto> {
    return await this.userService.register(data, res)
  }

  @Mutation(() => UserLoginResponseDto, { description: 'Login user' })
  public async loginUser(
    @Arg('data') data: UserLoginInput,
    @Ctx() { res }: AuthContext
  ): Promise<UserLoginResponseDto> {
    return await this.userService.login(data, res)
  }

  @Mutation(() => Boolean, { description: 'Logout user' })
  public async logoutUser(@Ctx() { res }: AuthContext): Promise<Boolean> {
    return await this.userService.logout(res)
  }
}
