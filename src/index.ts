require('dotenv').config()
import env from '@src/config/env'
import logger from '@src/utils/logger.util'
import server from './server'

const bootstrap = async () => {
  try {
    server()
      .then(app => app.listen(env.port))
      .catch(err => {
        throw new Error(err)
      })

    logger.info(`GraphQL server is running on ${env.host}:${env.port}${env.graphqlPath}`)
  } catch (err) {
    logger.error('app-error: ', err)
  }
}

bootstrap()
