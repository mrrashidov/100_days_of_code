exports.up = function (knex) {
  return knex.schema.createTable("todos", function (table) {
    table.bigIncrements("id");
    table.specificType("tenant_id", "int").notNullable();
    table.specificType("category_id", "int").notNullable();
    table.specificType("name", "char(5)").notNullable();
    table.string("body", 32).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("todos");
};
