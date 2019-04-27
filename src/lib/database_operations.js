const logger = require('./logger').logger;

let knex;

async function init(){

  logger.info('Initialising connection to mysql database');
  knex = require('knex')({
    client: 'mysql',
    connection: {
      host: process.env.MYDB_HOST,
      port: process.env.MYDB_PORT,
      usrname: process.env.MYDB_USER,
      password: process.env.MYDB_PASS,
      database: process.env.MYDB_NAME
    },
    migrations: {
      directory: __dirname + '../lib/../src/../migrations'
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.query(`select 'This is a check for db connection'`, err => {
          if(err){
            logger.error(`Could not connect to db: ${err.message}`);
          }

          logger.info('Successfully connected to mysql db');
        })
      }
    }
  });
}

async function buildDatabase(){
  try{
    logger.info(`Building ${process.env.MYDB_NAME} database`);
    console.log(process.env.MYDB_NAME);
    await knex.migrate.latest();
    logger.info(`Successfully built ${process.env.MYDB_NAME} database`);
  }catch(err){
    logger.error(`Could not build ${process.env.MYDB_NAME} database: ${err.message}`);
  }
}

function killDatabaseConnection(){
  try{
    logger.info(`Kiling database connection`);
    knex.destroy();
    logger.info(`Successfully killed database connection :D`);
  }catch(err){
    logger.error(`Could not kill database: ${err.message}`);
  }
}

module.exports = {
  init,
  buildDatabase
};
