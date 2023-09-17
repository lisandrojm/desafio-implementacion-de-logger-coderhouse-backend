/* /src/utils/logger/loggerMiddleware.js */

const { devLogger, stageLogger, prodLogger } = require('./logger'); // Importa los loggers
const { args } = require('../../config/index');

function loggerMiddleware(req, res, next) {
  if (args.mode === 'production') {
    req.logger = prodLogger;
    req.logger.info('prodLogger running');
  } else if (args.mode === 'staging') {
    req.logger = stageLogger; // Usa stageLogger en caso de staging
    req.logger.info('stageLogger running');
  } else {
    req.logger = devLogger;
    req.logger.info('devLogger running');
  }
  next();
}

module.exports = loggerMiddleware;

/* ///////////////////////////////////////// */
/* Comandos para las diferentes variables de entorno */
/* ///////////////////////////////////////// */
/* node index.js -m development -p MONGO */
/* node index.js -m staging -p MONGO */
/* node index.js -m production -p MONGO */
/* ///////////////////////////////////////// */
