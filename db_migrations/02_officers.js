exports.up = (knex) => {
  return knex.schema.createTable('officers', table => {
    table.increments();
    table.string('officername', 255).notNullable();
    table.string('officerid', 100).notNullable();
    table.enu('status', ['assigned', 'unassigned']).defaultTo('unassigned');
    table.timestamps(true, true);
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('officers');
};
