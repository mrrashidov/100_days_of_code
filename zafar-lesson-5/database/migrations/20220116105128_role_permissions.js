exports.up = function (knex) {
  return knex.schema.createTable("role_permissions", function (table) {
    table.specificType("role_id", "bigint").notNullable();
    table.specificType("permission_id", "int").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("role_permissions");
};
