import { Max, Min } from 'class-validator'
import { ArgsType, Field, Int } from 'type-graphql'

@ArgsType()
export class PaginationArgs {
  @Field(() => Int, { nullable: true, description: 'Limit' })
  @Min(1)
  @Max(250)
  limit?: number

  @Field(() => Int, { defaultValue: 0, nullable: true, description: 'Page' })
  @Min(0)
  page?: number

  @Field({ nullable: true, description: 'Order by field name' })
  orderByFieldName?: string

  @Field({ nullable: true, description: 'Order by direction' })
  orderByDirection?: 'ASC' | 'DESC'
}
