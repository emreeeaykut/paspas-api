import env from '@src/config/env'
import winston from 'winston'

const options: winston.LoggerOptions = {
  format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
  transports: [
    new winston.transports.Console({
      level: env.nodeEnv === 'production' ? 'error' : 'debug',
      format: winston.format.cli(),
    }),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/info.log', level: 'info' }),
  ],
}

const logger = winston.createLogger(options)

if (env.nodeEnv !== 'production') {
  logger.debug('Logging initialized at debug level')
}

export default logger
