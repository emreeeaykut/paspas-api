import { Post } from './post.entity'
import { PostInput } from './post.input'
import { PostResponseDto } from './post.dto'
import { CategoryMapper } from '@src/modules/category/category.mapper'

export class PostMapper {
  public static toDto(entity: Post): PostResponseDto {
    const dto = new PostResponseDto()

    dto.id = entity.id
    dto.title = entity.title
    dto.description = entity.description
    dto.content = entity.content
    dto.img = entity.img
    dto.category = CategoryMapper.toDto(entity.category)
    dto.createdAt = entity.createdAt
    dto.updatedAt = entity.updatedAt
    dto.isActive = entity.isActive

    return dto
  }

  public static toCreateEntity(data: PostInput): Post {
    const entity = new Post()

    entity.title = data.title
    entity.description = data.description
    entity.content = data.content
    entity.img = data.img
    entity.category = data.category
    entity.isActive = data.isActive === false ? false : true

    return entity
  }

  public static toUpdateEntity(entity: Post, data: PostInput): Post {
    entity.title = data.title
    entity.description = data.description
    entity.content = data.content
    entity.img = data.img || entity.img
    entity.category = data.category
    entity.isActive = data.isActive === false ? false : true

    return entity
  }
}
