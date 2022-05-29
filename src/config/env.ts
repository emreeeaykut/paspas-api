export default {
  nodeEnv: process.env.NODE_ENV || 'development',
  host: process.env.HOST,
  port: process.env.PORT,
  graphqlPath: process.env.GRAPHQL_PATH,
  redisHost: process.env.REDIS_HOST,
  redisPort: process.env.REDIS_PORT,
  redisPass: process.env.REDIS_PASS,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
  refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
}
