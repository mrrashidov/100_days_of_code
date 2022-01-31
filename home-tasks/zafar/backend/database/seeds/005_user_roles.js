const user_roles = [
  {
    user_id: 1,
    role_id: 1,
  },
  {
    user_id: 2,
    role_id: 2,
  },
  {
    user_id: 3,
    role_id: 3,
  },
  {
    user_id: 4,
    role_id: 3,
  },
  {
    user_id: 5,
    role_id: 3,
  },
  {
    user_id: 6,
    role_id: 3,
  },
];

exports.seed = (knex) =>
  knex("user_roles")
    .del()
    .then(() => knex("user_roles").insert(user_roles));
