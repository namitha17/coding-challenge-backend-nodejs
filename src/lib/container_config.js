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
    bike_service: asClass(bike_service, {lifetime: Lifetime.SCOPED}),
    bike_db: asClass(bike_db, {lifetime: Lifetime.SCOPED}),
    case_service: asClass(case_service, {lifetime: Lifetime.SCOPED}),
    case_db: asClass(case_db, {lifetime: Lifetime.SCOPED}),
    officer_service: asClass(officer_service, {lifetime: Lifetime.SCOPED}),
    officer_db: asClass(officer_db, {lifetime: Lifetime.SCOPED})
  });

  logger.info(`Successfully completed dependency injection container configuration`);
}

module.exports = {
  configureDIcontainer
};
