import connectRedis from 'connect-redis'
import session from 'express-session'
import env from './env'
import redis from './redis'

const RedisStore = connectRedis(session)

export default session({
  store: new RedisStore({
    client: redis,
  }),
  name: 'qid',
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: env.nodeEnv === 'production',
    maxAge: 1000 * 60 * 60 * 24 * 7 * 365,
  },
})
