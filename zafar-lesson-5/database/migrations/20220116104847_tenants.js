exports.up = function (knex) {
  return knex.schema.createTable("tenants", function (table) {
    table.bigIncrements("id");
    table.specificType("model_type", "int").notNullable();
    table.specificType("model_id", "int").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("tenants");
};
