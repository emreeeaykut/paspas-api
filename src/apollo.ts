import 'reflect-metadata'
import env from '@src/config/env'
import {
  ApolloServerPluginLandingPageDisabled,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from 'apollo-server-core'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { useContainer } from 'typeorm'
import { Container } from 'typeorm-typedi-extensions'
import { PostResolver } from '@src/modules/post/post.resolver'
import { CategoryResolver } from '@src/modules/category/category.resolver'
import { UserResolver } from '@src/modules/user/user.resolver'

export default async () => {
  useContainer(Container)

  const schema = await buildSchema({
    resolvers: [PostResolver, CategoryResolver, UserResolver],
    emitSchemaFile: {
      path: __dirname + '/schema/schema.gql',
      commentDescriptions: true,
      sortedSchema: false,
    },
    container: Container,
    validate: false,
  })

  const apolloServer = new ApolloServer({
    schema,
    csrfPrevention: true,
    introspection: env.nodeEnv !== 'production',
    plugins: [
      env.nodeEnv === 'production'
        ? ApolloServerPluginLandingPageDisabled()
        : ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
    context: ({ req, res }) => ({ req, res }),
  })

  return apolloServer
}
