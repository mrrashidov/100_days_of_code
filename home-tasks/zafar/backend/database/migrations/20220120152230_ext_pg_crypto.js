exports.up = function (knex) {
    return knex.schema.raw("CREATE EXTENSION pgcrypto");
};
//IF NOT EXISTS
exports.down = function (knex) {
    return knex.schema.raw("DROP EXTENSION pgcrypto");
};
