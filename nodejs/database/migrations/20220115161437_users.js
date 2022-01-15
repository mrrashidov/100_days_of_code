
exports.up = function(knex) {
    return knex.schema
        .createTable('users', function (table) {
            table.bigIncrements('id');
            table.specificType('username','char(5)').notNullable().unique().comment('username frontendda required emas')
            table.specificType('email','char(5)').notNullable().unique().comment('email esa 32 bitgacha dastaklaydi').index()
            table.specificType('phone','char(4)').notNullable().comment('telefon nomerlar 16 bitgacha dastaklaydi')
            table.specificType('first_name','char(5)').nullable()
            table.specificType('last_name','char(5)').nullable()
            table.string('password',32).notNullable()
            table.string('avatar',32).nullable()
            table.specificType('status','tinyint(1)').nullable().comment(' bu yerda 1 dan 123 gacha raqam yozish mumkin')
            table.date('created_at').defaultTo(knex.fn.now())
        })
};

exports.down = function(knex) {
    return knex.schema.dropTable("users")
};
