//https://chancejs.com/usage/node.html
const Chance = require("chance");
function generateSessions(count) {
  let chance = new Chance();
  let sessions = [];
  for (let i = 0; i < count; i++) {
    sessions.push({
      user_id: Math.trunc(Math.random() * 1000),
      token: chance.apple_token(),
    });
  }
  return sessions;
}
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("sessions")
    .del()
    .then(function () {
      return knex("sessions").insert(generateSessions(100));
    });
};

/*
            table.bigIncrements('id');
            table.bigInteger('user_id').notNullable();
            table.string('token',64).notNullable()
            table.date('expires_in').defaultTo(knex.fn.now())
            table.date('created_at').defaultTo(knex.fn.now())
            table.boolean('status').defaultTo(true)
*/
