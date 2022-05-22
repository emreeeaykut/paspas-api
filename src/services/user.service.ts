import { Service } from 'typedi'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { User } from '@entities/user.entity'
import { UserRepository } from '@repositories/user.repository'
import { Response } from 'express'
import { UserRegisterResponseDto } from '@dtos/user.dto'
import { compare, hash } from 'bcryptjs'
import { createAccessToken, createRefreshToken, setRefreshtoken } from '@utils/auth.util'

@Service()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository
  ) {}

  public async getAll(): Promise<User[]> {
    return await this.userRepository.find()
  }

  public async get(id: number): Promise<User> {
    const entity = await this.userRepository.findOne(id)

    if (!entity) throw new Error('User not found')

    return entity
  }

  public async create(data: Partial<User>): Promise<User> {
    return await this.userRepository.save(data)
  }

  public async update(id: number, data: Partial<User>): Promise<User> {
    const entity = await this.userRepository.findOne(id)

    if (!entity) throw new Error('User not found')

    Object.assign(entity, data)

    return await this.userRepository.save(entity)
  }

  public async delete(id: number): Promise<User> {
    const entity = await this.userRepository.findOne(id)

    if (!entity) throw new Error('User not found')

    await this.userRepository.delete(id)

    return entity
  }

  public async register(data: Partial<User>, res: Response): Promise<UserRegisterResponseDto> {
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

  public async login(data: Partial<User>, res: Response): Promise<UserRegisterResponseDto> {
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
