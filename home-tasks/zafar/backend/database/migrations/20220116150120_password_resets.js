exports.up = function(knex) {
    return knex.schema
        .createTable('password_resets', function (table) {
            table.bigIncrements('id');
            table.string('email',32).notNullable()
            table.string('token',64).notNullable()
            table.string('password',64).notNullable()
            table.date('created_at').defaultTo(knex.fn.now())
        })
};

exports.down = function(knex) {
    return knex.schema.dropTable("password_resets")
};
