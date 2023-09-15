/* ************************************************************************** */
/* /src/components/logger/loggerController/loggerController.js */
/* ************************************************************************** */

/* const LoggerServices = require('../loggerServices/loggerServices'); */

class LoggerController {
  getLogger = async (req, res) => {
    try {
      res.send({ message: '¡Prueba de loggerss!' }),
        /* transporte file */
        req.logger.warning('¡Alerta!');
    } catch (error) {
      /* res.status(500).send({ error: 'Ha ocurrido un error' }); */
      return res.sendServerError('Ha ocurrido un error');
    }
  };
}

module.exports = new LoggerController();
