exports.up = function (knex) {
  return knex.schema.createTable("teams", function (table) {
    table.increments("id");
    table.bigInteger("user_id").notNullable();
    table.string("name", 35).notNullable();
    table.string("description", 255);
    table.string("status", 10).defaultTo("pending");
    table.date("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("teams");
};
