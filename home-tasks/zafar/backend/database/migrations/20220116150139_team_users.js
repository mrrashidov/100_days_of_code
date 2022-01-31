exports.up = function (knex) {
    return knex.schema
        .createTable('team_users', function (table) {
            table.integer('team_id').references('id').inTable('teams')
            table.integer('user_id').references('id').inTable('users')
        })
};

exports.down = function (knex) {
    return knex.schema.dropTable("team_users")
};
