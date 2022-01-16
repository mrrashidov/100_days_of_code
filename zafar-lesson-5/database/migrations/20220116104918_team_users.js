exports.up = function (knex) {
  return knex.schema.createTable("team_users", function (table) {
    table.bigIncrements("id");
    table.specificType("user_id", "int").notNullable();
    table.specificType("team_id", "int").notNullable();
    table.specificType("role_id", "int").notNullable();
    table.specificType("status", "tinyint(1)").notNullable();
    table.date("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("team_users");
};
