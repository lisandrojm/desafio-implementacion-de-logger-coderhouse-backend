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
    fatal: 'orange',
    error: 'orange',
    warning: 'yellow',
    info: 'blue',
    http: 'green',
    debug: 'magenta',
  },
};

winston.addColors(customLevelsOptions.colors);

// Configuración del logger de desarrollo
const developmentLogger = winston.createLogger({
  levels: customLevelsOptions.levels,
  transports: [
    new winston.transports.Console({
      level: 'debug', // Solo loggeará a partir del nivel debug
      format: winston.format.combine(winston.format.colorize({ colors: customLevelsOptions.colors }), winston.format.simple(), winston.format.timestamp()),
    }),
  ],
});

// Configuración del logger de producción
const productionLogger = winston.createLogger({
  levels: customLevelsOptions.levels,
  transports: [
    new winston.transports.Console({
      level: 'info', // Solo loggeará a partir del nivel info
      format: winston.format.combine(winston.format.colorize({ colors: customLevelsOptions.colors }), winston.format.simple(), winston.format.timestamp()),
    }),
    new winston.transports.File({
      filename: './errors.log',
      level: 'error', // Logueará errores en un archivo "errors.log"
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
          return `${timestamp} [${level.toUpperCase()}]: ${message}`;
        })
      ),
    }),
  ],
});

module.exports = { developmentLogger, productionLogger };
