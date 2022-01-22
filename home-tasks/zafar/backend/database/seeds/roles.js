//https://chancejs.com/usage/node.html
const Chance = require("chance");
function generateRoles(count) {
  let chance = new Chance();
  let roles = [];
  for (let i = 0; i < count; i++) {
    roles.push({
      tenant_id: Math.trunc(Math.random() * 100),
      name: chance.word(),
      description: chance.sentence(),
    });
  }
  return roles;
}
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("roles")
    .del()
    .then(function () {
      return knex("roles").insert(generateRoles(100));
    });
};

/*
            table.increments('id');
            table.bigInteger('tenant_id').notNullable();
            table.string('name',35).notNullable()
            table.string('description',255).notNullable()
            table.boolean('type').defaultTo(false)
            table.boolean('status').defaultTo(true)
            table.date('created_at').defaultTo(knex.fn.now())
*/
