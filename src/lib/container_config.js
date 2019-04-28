const { createContainer, asClass, Lifetime } = require('awilix');
const { CONTAINER_MODULES } = require('./container_modules');
const logger = require('./logger').logger;

function configureDIcontainer(){
  logger.info(`Initialising dependency injection container configuration`);

  const diContainer = createContainer();
  diContainer.loadModules([[
      CONTAINER_MODULES.join(','),
      { register: asClass }
    ]], {
    resolverOptions: {
      lifetime: Lifetime.SCOPED
    }
  });

  logger.info(`Successfully completed dependency injection container configuration`);

  return diContainer;
}

module.exports = {
  configureDIcontainer
};
