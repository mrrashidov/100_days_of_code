exports.up = function (knex) {
  return knex.schema.createTable("roles", function (table) {
    table.increments("id");
    table.string("name", 35).notNullable();
    table.string("description", 255).notNullable();
    table.boolean("type").defaultTo(false);
    table.boolean("status").defaultTo(true);
    table.date("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = (knex) => knex.schema.dropTable("roles");
