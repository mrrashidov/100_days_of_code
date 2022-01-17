exports.up = function (knex) {
  return knex.schema.createTable("sessions", function (table) {
    table.bigIncrements("id");
    table.specificType("user_id", "bigint").notNullable();
    table.specificType("token", "char(5)").notNullable();
    table.date("expired_at").notNullable();
    table.specificType("status", "tinyint(1)").nullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("sessions");
};
