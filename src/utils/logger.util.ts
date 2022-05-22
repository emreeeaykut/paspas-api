import winston from 'winston'
import common from '@config/common'

const options: winston.LoggerOptions = {
  format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
  transports: [
    new winston.transports.Console({
      level: common.env === 'production' ? 'error' : 'debug',
      format: winston.format.cli(),
    }),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/info.log', level: 'info' }),
  ],
}

const logger = winston.createLogger(options)

if (common.env !== 'production') {
  logger.debug('Logging initialized at debug level')
}

export default logger
