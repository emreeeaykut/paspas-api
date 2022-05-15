import Redis from 'ioredis'
import common from './common'

const redis = new Redis(`rediss://:${common.redisPass}@${common.redisHost}:${common.redisPort}`)

export default redis
