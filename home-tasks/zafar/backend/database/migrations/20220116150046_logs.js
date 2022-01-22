exports.up = function(knex) {
    return knex.schema
        .createTable('logs', function (table) {
            table.bigIncrements('id');
            table.bigInteger('user_id').notNullable();
            table.json('meta').notNullable()
            table.date('created_at').defaultTo(knex.fn.now())
        })
};

exports.down = function(knex) {
    return knex.schema.dropTable("logs")
};
