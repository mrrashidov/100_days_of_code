//https://chancejs.com/usage/node.html
const Chance = require("chance");
function generateLogs(count) {
  let chance = new Chance();
  let logs = [];
  for (let i = 0; i < count; i++) {
    logs.push({
      user_id: Math.trunc(Math.random() * 1000),
      meta: { key: "Value" },
    });
  }
  return logs;
}
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("logs")
    .del()
    .then(function () {
      return knex("logs").insert(generateLogs(100));
    });
};

/*
            table.bigIncrements('id');
            table.bigInteger('user_id').notNullable();
            table.json('meta').notNullable()
            table.date('created_at').defaultTo(knex.fn.now())
*/
