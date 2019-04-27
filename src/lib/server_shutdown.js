const logger = require('./logger').logger;
const database_operations = require('./database_operations');
const forcedTimeout = 10000;

function serverShutDownInit(process, server){
  if(process.env.NODE_ENV !== 'dev'){
    process.on('SIGTERM', async () => {
      server.close(err => {
        if(err){
          process.exit(1);
        }
      });

      database_operations.killDatabaseConnection();
      process.exit();

      //Forcefully itmeout after a while
      settimeout(() => {
        process.exit(1);
      }, forcedTimeout);
    });
  }
}

module.exports = {
  serverShutDownInit
};
