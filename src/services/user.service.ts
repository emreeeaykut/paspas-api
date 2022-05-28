import { Service } from 'typedi'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { UserRepository } from '@repositories/user.repository'
import { Response } from 'express'
import { UserRegisterResponseDto, UserResponseDto } from '@dtos/user.dto'
import { compare, hash } from 'bcryptjs'
import { createAccessToken, createRefreshToken, setRefreshtoken } from '@utils/auth.util'
import { UserInput, UserLoginInput, UserRegisterInput } from '@inputs/user.input'
import { UserMapper } from '@mappers/user.mapper'
import { PaginationArgs } from '@common/args/pagination.args'

@Service()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository
  ) {}

  public async getAll(pagination?: PaginationArgs): Promise<UserResponseDto[]> {
    const entities = await this.userRepository.getAll(pagination)

    return await Promise.all(entities.map(UserMapper.toDto))
  }

  public async getTotal(): Promise<number> {
    return await this.userRepository.count()
  }

  public async get(id: number): Promise<UserResponseDto> {
    const entity = await this.userRepository.findOne(id)

    if (!entity) throw new Error('User not found')

    return UserMapper.toDto(entity)
  }

  public async create(data: UserInput): Promise<UserResponseDto> {
    let entity = UserMapper.toCreateEntity(data)

    entity = await this.userRepository.save(entity)

    return UserMapper.toDto(entity)
  }

  public async update(id: number, data: UserInput): Promise<UserResponseDto> {
    let entity = await this.userRepository.findOne(id)

    if (!entity) throw new Error('User not found')

    entity = UserMapper.toUpdateEntity(entity, data)

    entity = await this.userRepository.save(entity)

    return UserMapper.toDto(entity)
  }

  public async delete(id: number): Promise<UserResponseDto> {
    const entity = await this.userRepository.findOne(id)

    if (!entity) throw new Error('User not found')

    await this.userRepository.delete(id)

    return UserMapper.toDto(entity)
  }

  public async register(data: UserRegisterInput, res: Response): Promise<UserRegisterResponseDto> {
    const { password } = data

    data.password = await hash(password!, 12)

    try {
      const user = await this.userRepository.save(data)

      setRefreshtoken(res, createRefreshToken(user))

      return {
        accessToken: createAccessToken(user),
        user,
      }
    } catch (err: any) {
      throw new Error(err)
    }
  }

  public async login(data: UserLoginInput, res: Response): Promise<UserRegisterResponseDto> {
    const { email, password } = data

    const user = await this.userRepository.findOne({ where: { email } })

    if (!user) throw new Error('User not found')

    const valid = await compare(password!, user.password)

    if (!valid) throw new Error('Incorrect password')

    setRefreshtoken(res, createRefreshToken(user))

    return {
      accessToken: createAccessToken(user),
      user,
    }
  }

  public async logout(res: Response): Promise<boolean> {
    setRefreshtoken(res, '')

    return true
  }
}
