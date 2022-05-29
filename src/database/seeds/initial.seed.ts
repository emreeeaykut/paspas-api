import { Factory, Seeder } from 'typeorm-seeding'
import { Category } from '@src/modules/category/category.entity'
import { Post } from '@src/modules/post/post.entity'

export default class InitialSeed implements Seeder {
  public async run(factory: Factory): Promise<void> {
    const categories = await factory(Category)().createMany(15)

    await factory(Post)()
      .map(async post => {
        post.category = categories[Math.floor(Math.random() * categories.length)]

        return post
      })
      .createMany(100)
  }
}
