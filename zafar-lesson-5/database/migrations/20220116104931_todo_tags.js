exports.up = function (knex) {
  return knex.schema.createTable("todo_tags", function (table) {
    table.specificType("todo_id", "int").notNullable();
    table.specificType("tag_id", "int").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("todo_tags");
};
