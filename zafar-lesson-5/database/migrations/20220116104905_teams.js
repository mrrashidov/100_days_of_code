exports.up = function (knex) {
  return knex.schema.createTable("teams", function (table) {
    table.bigIncrements("id");
    table.specificType("owner_id", "int").notNullable();
    table.specificType("name", "char(5)").notNullable();
    table.string("description", 32).nullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("teams");
};
