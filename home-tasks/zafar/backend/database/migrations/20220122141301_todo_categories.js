exports.up = function (knex) {
  return knex.schema.createTable("todo_categories", function (table) {
    table.integer("todo_id").references("id").inTable("todos");
    table.integer("category_id").references("id").inTable("categories");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("todo_categories");
};
