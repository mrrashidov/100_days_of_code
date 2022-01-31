exports.up = function (knex) {
  return knex.schema.createTable("messages", function (table) {
    table.increments("id");
    table.string("content", 35).notNullable();
    table.integer("sender_id").notNullable();
    table.integer("receiver_id").notNullable();
    table.enum("type_receiver", ["user", "group"]).notNullable();
    table.boolean("type").defaultTo(false);
    table.date("created_at").defaultTo(knex.fn.now());
    table.date("updated_at").nullable();
    table.date("deleted_at").nullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("messages");
};
