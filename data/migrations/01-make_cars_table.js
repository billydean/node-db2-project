exports.up = function (knex) {
  return knex.schema.createTable('cars', tbl => {
    // primary key
    tbl.increments();
    tbl.string('vin').unique().notNullable();
    tbl.string('make').notNullable();
    tbl.string('model').notNullable();
    tbl.decimal('mileage').notNullable();
    tbl.string('title')
    tbl.string('transmission')
  })
};

exports.down = function (knex) {
  // "down" drops the entire cars table; it undoes the "up" function
  return knex.schema.dropTableIfExists('cars');
};
