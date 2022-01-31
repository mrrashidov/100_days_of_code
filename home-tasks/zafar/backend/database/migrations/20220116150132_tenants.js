exports.up = function(knex) {
    return knex.schema
        .createTable('tenants', function (table) {
            table.integer('id');
            table.specificType('model_type','SMALLINT').notNullable()
            table.bigInteger('model_id').notNullable()
        })
};

exports.down = function(knex) {
    return knex.schema.dropTable("tenants")
};
