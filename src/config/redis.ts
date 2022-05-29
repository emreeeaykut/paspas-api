import Redis from 'ioredis'
import env from './env'

const redis = new Redis(`rediss://:${env.redisPass}@${env.redisHost}:${env.redisPort}`)

export default redis
