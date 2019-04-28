//Modify here to add/remove modules for the dependency injection container
const CONTAINER_MODULES = [
  '../lib/../kernel/bikes/controller/bike_service.js',
  '../lib/../kernel/bikes/db_operations/bike_db.js',
  '../lib/../kernel/cases/controller/case_service.js',
  '../lib/../kernel/cases/db_operations/case_db.js',
  '../lib/../kernel/officers/controller/officer_service.js',
  '../lib/../kernel/officers/db_operations/officer_db.js'
];

module.exports = {
  CONTAINER_MODULES
};
