/* ************************************************************************** */
/* /src/utils/logger/logger.js 
/* ************************************************************************** */
const winston = require('winston');

const customLevelsOptions = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5,
  },
  colors: {
    fatal: 'red',
    error: 'orange',
    warning: 'yellow',
    info: 'blue',
    http: 'green',
    debug: 'white',
  },
};

winston.addColors(customLevelsOptions.colors);

const logger = winston.createLogger({
  levels: customLevelsOptions.levels,
  transports: [
    new winston.transports.Console({
      level: 'info',
      format: winston.format.combine(winston.format.colorize({ colors: customLevelsOptions.colors }), winston.format.simple(), winston.format.timestamp()),
    }),

    new winston.transports.File({
      filename: './errors.log',
      level: 'warning',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
          return `${timestamp} [${level.toUpperCase()}]: ${message}`;
        })
      ),
    }),
  ],
});

const addLogger = (req, res, next) => {
  req.logger = logger;
  req.logger.info(`${req.method} en ${req.url}`);
  next();
};

module.exports = { addLogger, developmentLogger, productionLogger };
