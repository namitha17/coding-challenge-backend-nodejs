const express = require('express');
const dotenv = require('dotenv/config');
const bodyParser = require('body-parser');
const awilixExpress = require('awilix-express');
const database_operations = require('./lib/database_operations');
const logger = require('./lib/logger').logger;
const server_shutdown = require('./lib/server_shutdown');
const container_config = require('./lib/container_config');
const routes = require('./routes/api_routes.js');
let container;

async function startstolenBikeService(){
  try{
    await database_operations.init() //innitialise db
    console.log('db initiated');
    await database_operations.buildDatabase(); //create db objects
    console.log('db created');
    container = container_config.configureDIcontainer(); //initialise di container

    //initialise app
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(awilixExpress.scopePerRequest(container));
    app.use('/', routes);
    const server = app.listen(8080);
    logger.info('Successfully initialised app');

    //graful server shutdown
    server_shutdown.serverShutDownInit(process, server);
  }catch(err){
    logger.error(`Oops! Could not start stolen bike service: ${err.message}`);
    process.exit(128);
  }
}

module.exports = {
  startstolenBikeService
};
