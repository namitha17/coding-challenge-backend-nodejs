exports.up = async (knex) => {

  //check if bikes and officers have been created before creating cases
  const bikesCreated = await knex.schema.hasTable('bikes');
  const officersCreated = await knex.schema.hasTable('officers');

  console.log(bikesCreated + "; " + officersCreated);
  if(bikesCreated && officersCreated){
    return knex.schema.createTable('cases', table => {
      table.increments();
      table.integer('bikeid').unsigned();
      table.foreign('bikeid').references('bikes.id').onDelete('SET NULL');
      table.integer('officerid').unsigned();
      table.foreign('officerid').references('officers.id').onDelete('SET NULL');
      table.enu('status', ['unassigned', 'assigned', 'resolved']).defaultTo('unassigned');
      table.timestamps(true, true);
    });
  }
};

exports.down = (knex) => {
  return knex.schema.dropTable('cases');
};
