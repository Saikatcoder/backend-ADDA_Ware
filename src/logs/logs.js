import winston from 'winston';

const logger = winston.createLogger({
  level: 'info', // log level: error, warn, info, verbose, debug
  transports: [
    new winston.transports.Console(), // show in terminal
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/all.log' }),
  ],
});

export default logger;
