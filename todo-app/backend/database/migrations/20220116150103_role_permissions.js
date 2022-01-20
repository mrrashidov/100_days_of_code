exports.up = function(knex) {
    return knex.schema
        .createTable('role_permissions', function (table) {
            table.integer('role_id').references('id').inTable('roles')
            table.integer('permission_id').references('id').inTable('permissions')
        })
};

exports.down = function(knex) {
    return knex.schema.dropTable("role_permissions")
};
