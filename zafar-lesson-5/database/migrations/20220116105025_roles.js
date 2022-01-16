exports.up = function (knex) {
  return knex.schema.createTable("roles", function (table) {
    table.bigIncrements("id");
    table.specificType("tenant_id", "bigint").notNullable();
    table.specificType("name", "char(5)").notNullable();
    table.string("description", 32).nullable();
    table.specificType("type", "boolean").nullable().defaultTo(false);
    table.specificType("status", "tinyint(1)").nullable();
    table.date("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("roles");
};
