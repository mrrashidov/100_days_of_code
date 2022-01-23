exports.up = function (knex) {
  return knex.schema.createTable("todo_tags", function (table) {
    table.integer("todo_id").references("id").inTable("todos");
    table.integer("tag_id").references("id").inTable("tags");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("todo_tags");
};
