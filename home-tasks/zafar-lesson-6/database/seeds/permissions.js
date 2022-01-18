//https://chancejs.com/usage/node.html
const Chance = require("chance");
function generatePermissions(count) {
  let chance = new Chance();
  let permissions = [];
  for (let i = 0; i < count; i++) {
    permissions.push({
      name: chance.word(),
      description: chance.sentence(),
    });
  }
  return permissions;
}
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("permissions")
    .del()
    .then(function () {
      return knex("permissions").insert(generatePermissions(100));
    });
};

/*
            table.increments('id');
            table.string('name',35).notNullable()
            table.string('description',255).notNullable()
*/
