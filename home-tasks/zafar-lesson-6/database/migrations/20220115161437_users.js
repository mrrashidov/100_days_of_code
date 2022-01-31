exports.up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.bigIncrements("id");
    table
      .string("username", 35)
      .notNullable()
      .unique()
      .comment("username frontendda required emas");
    table
      .string("email", 35)
      .notNullable()
      .unique()
      .comment("email esa 32 bitgacha dastaklaydi")
      .index();
    table
      .string("phone", 16)
      .notNullable()
      .comment("telefon nomerlar 16 bitgacha dastaklaydi");
    table.string("first_name", 25).nullable();
    table.string("last_name", 25).nullable();
    table.string("password", 64).notNullable();
    table.string("avatar", 128).nullable();
    table
      .specificType("status", "SMALLINT")
      .nullable()
      .comment(" bu yerda 1 dan 123 gacha raqam yozish mumkin");
    table.date("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
