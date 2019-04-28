exports.up = (knex) => {
  return knex.schema.createTable('bikes', table => {
    table.increments();
    table.string('ownername', 255).notNullable();
    table.string('bikename', 255).notNullable();
    table.string('licenseno', 100).notNullable();
    table.enu('status', ['stolen', 'found']).defaultTo('stolen');
    table.enu('type', [
      'Mountain Bike',
      'Comfort Bike',
      'Road Bike',
      'Commuting Bike',
      'Track Bike',
      'Tandem Bike',
      'Kids Bike'
    ]).defaultTo('Commuting Bike');
    table.string('color', 20).notNullable();
    table.text('description');
    table.timestamp('stolenondate');
    table.string('stolenfromarea', 100);
    table.timestamps(true, true);
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('bikes');
};
