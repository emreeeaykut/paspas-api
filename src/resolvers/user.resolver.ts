import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql'
import { UserService } from '@services/user.service'
import { User } from '@entities/user.entity'
import { UserInput, UserRegisterInput, UserLoginInput } from '@inputs/user.input'
import { UserLoginResponseDto, UserRegisterResponseDto } from '@dtos/user.dto'
import { AuthContext } from '@contexts/auth.context'
import { isAuth } from '@middlewares/is-auth.middleware'

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User], { description: 'Get all users' })
  public async users(): Promise<User[]> {
    return await this.userService.getAll()
  }

  @Query(() => User, { description: 'Get user by id' })
  public async user(@Arg('id') id: number): Promise<User> {
    return await this.userService.get(id)
  }

  @Mutation(() => User, { description: 'Create user' })
  public async createUser(@Arg('data') data: UserInput): Promise<User> {
    return await this.userService.create(data)
  }

  @Mutation(() => User, { description: 'Update user' })
  public async updateUser(@Arg('id') id: number, @Arg('data') data: UserInput): Promise<User> {
    return await this.userService.update(id, data)
  }

  @Mutation(() => User, { description: 'Delete user' })
  public async deleteUser(@Arg('id') id: number): Promise<User> {
    return await this.userService.delete(id)
  }

  @Query(() => User, { description: 'Get user info with context' })
  @UseMiddleware(isAuth)
  public async infoUser(@Ctx() { payload }: AuthContext) {
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
