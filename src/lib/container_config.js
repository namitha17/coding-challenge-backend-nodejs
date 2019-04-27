const {createContainer, asClass} = require('awilix');
const logger = require('./logger').logger;
const bike_service = require('../lib/../kernel/bikes/controller/bike_service');
const bike_db = require('../lib/../kernel/bikes/db_operations/bike_db');
const case_service = require('../lib/../kernel/cases/controller/case_service');
const case_db = require('../lib/../kernel/cases/db_operations/case_db');
const officer_service = require('../lib/../kernel/officers/controller/officer_service');
const officer_db = require('../lib/../kernel/officers/db_operations/officer_db');

function configureDIcontainer(){
  logger.info(`Initialising dependency injection container configuration`);

  const diContainer = createContainer();
  diContainer.register({
    bike_service: asClass(bike_service).scoped(),
    bike_db: asClass(bike_db).scoped(),
    case_service: asClass(case_service).scoped(),
    case_db: asClass(case_db).scoped(),
    officer_service: asClass(officer_service).scoped(),
    officer_db: asClass(officer_db).scoped()
  });

  logger.info(`Successfully completed dependency injection container configuration`);

  return diContainer;
}

module.exports = {
  configureDIcontainer
};
