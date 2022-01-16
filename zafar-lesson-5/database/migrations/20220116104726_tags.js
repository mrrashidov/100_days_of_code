exports.up = function (knex) {
  return knex.schema.createTable("tags", function (table) {
    table.bigIncrements("id");
    table.specificType("tenant_id", "int").notNullable();
    table.specificType("name", "char(5)").notNullable();
    table.string("description", 32).nullable();
    table.specificType("color", "char(5)").nullable();
    table.specificType("status", "tinyint(1)").nullable();
    table.date("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("tags");
};
