const roles = [
  {
    name: "Super Admin",
    description: "Super Admin",
    type: 0,
    status: 1,
  },
  {
    name: "Admin",
    description: "Admin",
    type: 0,
    status: 1,
  },
  {
    name: "User",
    description: "User",
    type: 1,
    status: 1,
  },
];
exports.seed = (knex) =>
  knex("roles")
    .del()
    .then(() => knex("roles").insert(roles));
