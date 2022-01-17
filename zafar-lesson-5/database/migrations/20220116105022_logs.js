exports.up = function (knex) {
  return knex.schema.createTable("logs", function (table) {
    table.bigIncrements("id");
    table.specificType("user_id", "bigint").notNullable();
    table.specificType("meta", "json").notNullable(); // JSON format to`g`ri yozilganiga ishonchim komil emas
    table.date("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("logs");
};
