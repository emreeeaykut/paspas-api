import { Category } from '@entities/category.entity'
import { CategoryInput } from '@inputs/category.input'
import { CategoryResponseDto } from 'src/dtos/category.dto'

export class CategoryMapper {
  public static toDto(entity: Category): CategoryResponseDto {
    const dto = new CategoryResponseDto()

    dto.id = entity.id
    dto.title = entity.title
    dto.createdAt = entity.createdAt
    dto.updatedAt = entity.updatedAt
    dto.isActive = entity.isActive

    return dto
  }

  public static toCreateEntity(data: CategoryInput): Category {
    const entity = new Category()

    entity.title = data.title
    entity.isActive = data.isActive === false ? false : true

    return entity
  }

  public static toUpdateEntity(entity: Category, data: CategoryInput): Category {
    entity.title = data.title
    entity.isActive = data.isActive === false ? false : true

    return entity
  }
}
