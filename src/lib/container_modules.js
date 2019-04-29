//Modify here to add/remove modules for the dependency injection container
const CONTAINER_MODULES = {
  bikeService         : require('../lib/../kernel/bikes/controller/bike_service'),
  bikeDbOperations    : require('../lib/../kernel/bikes/db_operations/bike_db'),
  bikeValidator       : require('../lib/../kernel/bikes/operations/bike_validator'),
  caseService         : require('../lib/../kernel/cases/controller/case_service'),
  caseDbOperations    : require('../lib/../kernel/cases/db_operations/case_db'),
  officerService      : require('../lib/../kernel/officers/controller/officer_service'),
  officerDbOperations : require('../lib/../kernel/officers/db_operations/officer_db')
};

module.exports = CONTAINER_MODULES;
