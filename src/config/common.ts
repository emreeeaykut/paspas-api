export default {
  env: process.env.NODE_ENV || 'development',
  host: process.env.HOST,
  port: process.env.PORT,
  graphqlPath: process.env.GRAPHQL_PATH,
  redisHost: process.env.REDIS_HOST,
  redisPort: process.env.REDIS_PORT,
  redisPass: process.env.REDIS_PASS,
}
