//https://chancejs.com/usage/node.html
const { model_type } = require("../../src/helpers/constants");

const Chance = require("chance");
function generateTenants(count) {
  let chance = new Chance();
  let tenants = [];
  for (let i = 0; i < count; i++) {
    tenants.push({
      id: i,
      model_type: model_type.user,
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
