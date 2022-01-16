exports.up = function (knex) {
  return knex.schema.createTable("user_permissions", function (table) {
    table.specificType("user_id", "bigint").notNullable();
    table.specificType("permission_id", "int").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("user_permissions");
};
