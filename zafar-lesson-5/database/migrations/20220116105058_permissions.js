exports.up = function (knex) {
  return knex.schema.createTable("permissions", function (table) {
    table.bigIncrements("id");
    table.specificType("name", "char(5)").notNullable();
    table.specificType("action", "char(5)").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("permissions");
};
