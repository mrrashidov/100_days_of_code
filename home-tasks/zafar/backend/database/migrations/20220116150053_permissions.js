exports.up = function(knex) {
    return knex.schema
        .createTable('permissions', function (table) {
            table.increments('id');
            table.string('name',35).notNullable()
            table.string('description',255).notNullable()
        })
};

exports.down = function(knex) {
    return knex.schema.dropTable("permissions")
};
