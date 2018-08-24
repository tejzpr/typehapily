import winston from 'winston';
const logger:winston.Logger = winston.createLogger();

logger.add(new winston.transports.Console({
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple()
  )
}));

export default logger;