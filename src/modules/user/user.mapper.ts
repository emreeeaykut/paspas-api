import { User } from './user.entity'
import { UserInput } from './user.input'
import { UserResponseDto } from './user.dto'

export class UserMapper {
  public static toDto(entity: User): UserResponseDto {
    const dto = new UserResponseDto()

    dto.id = entity.id
    dto.email = entity.email
    dto.username = entity.username
    dto.firstname = entity.firstname
    dto.lastname = entity.lastname
    dto.createdAt = entity.createdAt
    dto.updatedAt = entity.updatedAt
    dto.isActive = entity.isActive

    return dto
  }

  public static toCreateEntity(data: UserInput): User {
    const entity = new User()

    entity.email = data.email
    entity.password = data.password
    entity.username = data.username
    entity.firstname = data.firstname
    entity.lastname = data.lastname
    entity.isActive = data.isActive === false ? false : true

    return entity
  }

  public static toUpdateEntity(entity: User, data: UserInput): User {
    entity.email = data.email
    entity.password = data.password
    entity.username = data.username
    entity.firstname = data.firstname
    entity.lastname = data.lastname
    entity.isActive = data.isActive === false ? false : true

    return entity
  }
}
