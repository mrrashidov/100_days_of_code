exports.up = function(knex) {
    return knex.schema
        .createTable('user_permissions', function (table) {
            table.integer('user_id').references('id').inTable('users')
            table.integer('permission_id').references('id').inTable('permissions')
        })
};

exports.down = function(knex) {
    return knex.schema.dropTable("user_permissions")
};
