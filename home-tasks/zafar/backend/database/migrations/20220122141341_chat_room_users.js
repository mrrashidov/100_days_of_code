exports.up = function (knex) {
  return knex.schema.createTable("chat_room_users", function (table) {
    table.integer("user_id").references("id").inTable("users");
    table.integer("room_id").references("id").inTable("chat_rooms");
    table.enum("role", ["admin", "member"]).defaultTo("member");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("chat_room_users");
};
