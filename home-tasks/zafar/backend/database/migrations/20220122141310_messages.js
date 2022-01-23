exports.up = function (knex) {
  return knex.schema.createTable("messages", function (table) {
    table.increments("id");
    table.string("name", 35).notNullable();
    table.boolean("type").defaultTo(false);
    table.date("created_at").defaultTo(knex.fn.now());
    table.date("updated_at").notNullable();
    table.date("deleted_at").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("messages");
};
