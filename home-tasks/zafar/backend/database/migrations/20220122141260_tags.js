exports.up = function (knex) {
  return knex.schema.createTable("tags", function (table) {
    table.increments("id");
    table
      .bigInteger("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users");
    table.string("name", 35).notNullable();
    table.string("description", 255).notNullable();
    table.string("color", 10).defaultTo("red");
    table.boolean("type").defaultTo(false);
    table.string("status", 10).defaultTo("active");
    table.date("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("tags");
};
