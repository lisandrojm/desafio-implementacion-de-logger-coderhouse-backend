const { devLogger, prodLogger } = require('./logger');
const { args } = require('../../config/index');

function loggerMiddleware(req, res, next) {
  if (args.mode === 'production') {
    req.logger = prodLogger;
    req.logger.info('prodLogger running');
  } else {
    req.logger = devLogger;
    req.logger.info('devLogger running');
  }
  next();
}

/* ///////////////////////////////////////// */
/* Comandos para las diferentes variables de entorno */
/* ///////////////////////////////////////// */
/* node index.js -m development -p MONGO */
/* node index.js -m production -p MONGO */
/* ///////////////////////////////////////// */

module.exports = loggerMiddleware;
