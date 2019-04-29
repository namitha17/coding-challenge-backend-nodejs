const logger = require('./logger');
const database_operations = require('./database_operations');
const forcedTimeout = 10000;

function serverShutDownInit(process, server){
  if(process.env.NODE_ENV !== 'dev'){ //well, atleast try to figure it out in dev lol
    process.on('SIGTERM', async () => {
      logger.warn('Received SIGTERM signal, initialising server shutdown');
      server.close(err => {
        if(err){
          logger.error(`Error occured while closing server, attempting to force close ${err.message}`);
          process.exit(1);
        }

        database_operations.killDatabaseConnection();
        process.exit();
        logger.info('Successfully completed server shutdown');
      });

      //Forcefully itmeout after a while
      settimeout(() => {
        process.exit(1);
        logger.info('Successfully completed server shutdown');
      }, forcedTimeout);
    });
  }
}

module.exports = {
  serverShutDownInit
};
