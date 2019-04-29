const logger = require('./logger');
const path = require('path');
const asValue = require('awilix').asValue;

let knex;

async function init(){

  logger.info('Initialising connection to mysql database');
  knex = require('knex')({
    client: 'mysql',
    connection: {
      host: process.env.MYDB_HOST,
      port: process.env.MYDB_PORT,
      user: process.env.MYDB_USER,
      password: process.env.MYDB_PASS,
      database: process.env.MYDB_NAME
    },
    migrations: {
      tableName: 'db_migrations',
      directory: path.resolve(__dirname, '../lib/../../src/../db_migrations')
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.query(`select 'This is a check for db connection'`, err => {
          if(err){
            logger.error(`Could not connect to db: ${err.message}`);
            done(conn,err); //if connection failed just drop out
          }else{
            conn.query('select curdate()', err => {
              done(err,conn);
              logger.info('Successfully connected to mysql db');
            });
          }
        })
      }
    },
    acquireConnectionTimeout: 10000
  });
}

async function buildDatabase(){
  try{
    logger.info(`Building ${process.env.MYDB_NAME} db`);
    await knex.migrate.latest();
    logger.info(`Successfully built latest db objects`);
  }catch(err){
    logger.error(`Could not build ${process.env.MYDB_NAME} db: ${err.message}`);
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

async function resolveKnexConnection(req, res, next){
    const scope = req.container;
    const knexConn = await new Promise(resolve => {
        knex.transaction(ts => {
            resolve(ts);
        });
    });

    scope.register({knexConn: asValue(knexConn)});
    res._orig_json_handler = res.json;
    res.json = commitRollbackHandler(res, knexConn);
    next();
};

const commitRollbackHandler = (res, knexConn) => {
    return async function() {
        res.json = res._orig_json_handler;
        if (res.__err__) {
            await knexConn.rollback(res.__err__);
        } else {
            await knexConn.commit();
        }
        res.json.apply(this, arguments);
    };
};

module.exports = {
  init,
  buildDatabase,
  resolveKnexConnection
};
