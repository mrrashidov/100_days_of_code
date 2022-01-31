//https://chancejs.com/usage/node.html
const Chance = require("chance");
function generateTenants(count) {
  let chance = new Chance();
  let tenants = [];
  for (let i = 0; i < count; i++) {
    tenants.push({
      id: i,
      model_type: Math.trunc(Math.random() * 3 + 1),
      model_id: Math.trunc(Math.random() * 15 + 1),
    });
  }
  return tenants;
}
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("tenants")
    .del()
    .then(function () {
      return knex("tenants").insert(generateTenants(100));
    });
};

/*
            table.integer('id');
            table.specificType('model_type','SMALLINT').notNullable()
            table.bigInteger('model_id').notNullable()
*/
