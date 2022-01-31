exports.up = function(knex) {
    return knex.schema
        .createTable('sessions', function (table) {
            table.bigIncrements('id');
            table.bigInteger('user_id').notNullable();
            table.string('token',64).notNullable()
            table.date('expires_in').defaultTo(knex.fn.now())
            table.date('created_at').defaultTo(knex.fn.now())
            table.boolean('status').defaultTo(true)
        })
};

exports.down = function(knex) {
    return knex.schema.dropTable("sessions")
};
