const { createContainer, asClass } = require('awilix');
const CONTAINER_MODULES = require('./container_modules');
const logger = require('./logger');

function configureDIcontainer(){
  logger.info(`Initialising dependency injection container configuration`);

  const diContainer = createContainer();
  diContainer.register({
    bikeService: asClass(CONTAINER_MODULES.bikeService).scoped(),
    bikeDbOperations: asClass(CONTAINER_MODULES.bikeDbOperations).scoped(),
    caseService: asClass(CONTAINER_MODULES.caseService).scoped(),
    caseDbOperations: asClass(CONTAINER_MODULES.caseDbOperations).scoped(),
    officerService: asClass(CONTAINER_MODULES.officerService).scoped(),
    officerDbOperations: asClass(CONTAINER_MODULES.officerDbOperations).scoped()
  });

  logger.info(`Successfully completed dependency injection container configuration`);

  return diContainer;
}

module.exports = {
  configureDIcontainer
};
