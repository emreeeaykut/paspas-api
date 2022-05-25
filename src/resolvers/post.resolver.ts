import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { PostService } from '@services/post.service'
import { Post } from '@entities/post.entity'
import { PostInput } from '@inputs/post.input'
import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { join, parse } from 'path'
import { createWriteStream } from 'fs'
import { PostResponseDto } from '@dtos/post.dto'
@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query(() => [Post], { description: 'Get all posts' })
  public async posts(): Promise<PostResponseDto[]> {
    return await this.postService.getAll()
  }

  @Query(() => Post, { description: 'Get post by id' })
  public async post(@Arg('id') id: number): Promise<PostResponseDto> {
    return await this.postService.get(id)
  }

  @Mutation(() => Post, { description: 'Create post' })
  public async createPost(
    @Arg('file', () => GraphQLUpload) { createReadStream, filename }: FileUpload,
    @Arg('data') data: PostInput
  ): Promise<PostResponseDto> {
    let stream = createReadStream()

    const { ext, name } = parse(filename)

    const newName = name.replace(/([^a-z0-9 ]+)/gi, '-').replace(' ', '_') + '-' + Date.now() + ext

    const serverFile = join(__dirname, `/../uploads/${newName}`)

    let writeStream = createWriteStream(serverFile)

    stream.pipe(writeStream)

    const imgUrl = `/uploads/${newName}`

    data.img = imgUrl

    return await this.postService.create(data)
  }

  @Mutation(() => Post, { description: 'Update post' })
  public async updatePost(@Arg('id') id: number, @Arg('data') data: PostInput): Promise<PostResponseDto> {
    return await this.postService.update(id, data)
  }

  @Mutation(() => Post, { description: 'Delete post' })
  public async deletePost(@Arg('id') id: number): Promise<PostResponseDto> {
    return await this.postService.delete(id)
  }
}
