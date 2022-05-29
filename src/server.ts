import express from 'express'
import helmet from 'helmet'
import compression from 'compression'
import env from '@src/config/env'
import cors from '@src/config/cors'
import session from '@src/config/session'
import cookieParser from 'cookie-parser'
import apollo from './apollo'
import logger from './utils/logger.util'
import { databaseConnection } from '@src/config/database'
import { graphqlUploadExpress } from 'graphql-upload'
import { join } from 'path'
import { handleRefreshToken } from '@src/utils/auth.util'

const app = express()

app.use(cors)

app.use(cookieParser())

app.use(session)

app.use(helmet.xssFilter())

app.use(
  compression({
    filter: (req, res) => {
      return true
    },
  })
)

app.use(express.json())

app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }))

app.use('/uploads', express.static(join(__dirname, './uploads')))

app.get('/', (_req, res, _next) => {
  res.send('Open the /graphql route')
})

app.post('/refresh-token', handleRefreshToken)

const prepareServer = async () => {
  try {
    const apolloServer = await apollo()

    await apolloServer.start()

    apolloServer.applyMiddleware({ app, path: env.graphqlPath })

    await databaseConnection()
  } catch (err) {
    logger.error('server-error: ', err)
  }

  return app
}

export default async () => await prepareServer()
