exports.up = function (knex) {
  return knex.schema.createTable("password_resets", function (table) {
    table.bigIncrements("id");
    table.specificType("token", "char(6)").notNullable();
    table.specificType("status", "tinyint(1)").nullable();
    table.specificType("email", "char(5)").notNullable();
    table.specificType("password", "char(5)").notNullable();
    table.date("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("password_resets");
};
