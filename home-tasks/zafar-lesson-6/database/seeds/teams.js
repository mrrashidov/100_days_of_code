//https://chancejs.com/usage/node.html
const Chance = require("chance");
function generateTeams(count) {
  let chance = new Chance();
  let teams = [];
  for (let i = 0; i < count; i++) {
    teams.push({
      user_id: Math.trunc(Math.random() * 1000),
      name: chance.word(),
      description: chance.sentence(),
    });
  }
  return teams;
}
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("teams")
    .del()
    .then(function () {
      return knex("teams").insert(generateTeams(100));
    });
};

/*
            table.increments('id');
            table.bigInteger('user_id').notNullable()
            table.string('name',35).notNullable()
            table.string('description',255)
            table.boolean('status').defaultTo(true)
            table.date('created_at').defaultTo(knex.fn.now())
*/
