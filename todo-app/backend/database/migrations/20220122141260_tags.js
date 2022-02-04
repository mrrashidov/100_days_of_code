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
    table.boolean("type").defaultTo(false);
    table.specificType("status", "SMALLINT").nullable();
    table.specificType("color", "SMALLINT").nullable();
    table.date("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("tags");
};
