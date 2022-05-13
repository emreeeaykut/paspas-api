import { faker } from '@faker-js/faker'
import { define } from 'typeorm-seeding'
import { Category } from '@entities/category.entity'

define(Category, (f: typeof faker) => {
  const category = new Category()

  const title = f.lorem.sentence()

  category.title = title

  return category
})
