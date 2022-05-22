require('dotenv').config()
// import 'module-alias/register'
import common from '@config/common'
import server from './server'
import logger from './utils/logger.util'

const bootstrap = async () => {
  try {
    server()
      .then(app => app.listen(common.port))
      .catch(err => {
        throw new Error(err)
      })

    logger.info(`GraphQL server is running on ${common.host}:${common.port}${common.graphqlPath}`)
  } catch (err) {
    logger.error('app-error: ', err)
  }
}

bootstrap()
