import { faker } from '@faker-js/faker'
import { define } from 'typeorm-seeding'
import { Post } from '@src/modules/post/post.entity'

define(Post, (f: typeof faker) => {
  const post = new Post()

  const title = f.lorem.sentence()
  const description = f.lorem.sentence()
  const content = f.lorem.paragraphs()
  const img = '/images/post.jpg'

  post.title = title
  post.description = description
  post.content = content
  post.img = img

  return post
})
