exports.up = function (knex) {
  return knex.schema.createTable("chat_room_messages", function (table) {
    table.integer("room_id").references("id").inTable("chat_rooms");
    table.integer("message_id").references("id").inTable("messages");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("chat_room_messages");
};
