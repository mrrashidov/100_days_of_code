//https://chancejs.com/usage/node.html
const Chance = require("chance");
function generatePasswordResets(count) {
  let chance = new Chance();
  let password_resets = [];
  for (let i = 0; i < count; i++) {
    password_resets.push({
      email: chance.email(),
      token: chance.apple_token(),
      password: chance.word(),
    });
  }
  return password_resets;
}
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("password_resets")
    .del()
    .then(function () {
      return knex("password_resets").insert(generatePasswordResets(100));
    });
};

/*
            table.bigIncrements('id');
            table.string('email',32).notNullable()
            table.string('token',64).notNullable()
            table.string('password',64).notNullable()
            table.date('created_at').defaultTo(knex.fn.now())
*/
