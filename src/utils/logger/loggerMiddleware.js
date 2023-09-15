const { addLogger, developmentLogger, productionLogger } = require('./logger');
const { args } = require('../../config/index');

function loggerMiddleware(req, res, next) {
  if (args.mode === 'production') {
    req.logger = productionLogger;
    console.log('~~~ productionLogger running ~~~');
  } else {
    req.logger = developmentLogger;
    console.log('~~~ developmentLogger running ~~~');
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
