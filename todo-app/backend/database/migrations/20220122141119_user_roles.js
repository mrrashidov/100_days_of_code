exports.up = function (knex) {
  return knex.schema.createTable("user_roles", function (table) {
    table.integer("user_id").references("id").inTable("users");
    table.integer("role_id").references("id").inTable("roles");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("user_roles");
};
