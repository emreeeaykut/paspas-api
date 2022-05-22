import 'reflect-metadata'
import common from '@config/common'
import {
  ApolloServerPluginLandingPageDisabled,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from 'apollo-server-core'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { useContainer } from 'typeorm'
import { Container } from 'typeorm-typedi-extensions'
import { PostResolver } from '@resolvers/post.resolver'
import { CategoryResolver } from '@resolvers/category.resolver'
import { UserResolver } from '@resolvers/user.resolver'

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
    introspection: common.env !== 'production',
    plugins: [
      common.env === 'production'
        ? ApolloServerPluginLandingPageDisabled()
        : ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
    context: ({ req, res }) => ({ req, res }),
  })

  return apolloServer
}
