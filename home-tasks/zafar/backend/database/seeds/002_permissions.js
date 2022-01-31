const permissions = [
  {
    name: "read:permission",
    description: "User can access permissions",
  },
  {
    name: "read:role",
    description: "User can access role",
  },
  {
    name: "write:role",
    description: "User can access update and edit role",
  },
  {
    name: "create:role",
    description: "User can access create role",
  },
  {
    name: "delete:role",
    description: "User can access delete role",
  },
  {
    name: "read:user",
    description: "User can access user",
  },
  {
    name: "write:user",
    description: "User can access update and edit user",
  },
  {
    name: "create:user",
    description: "User can access create user",
  },
  {
    name: "delete:user",
    description: "User can access delete user",
  },
  {
    name: "read:team",
    description: "User can access team",
  },
  {
    name: "write:team",
    description: "User can access update and edit team",
  },
  {
    name: "create:team",
    description: "User can access create team",
  },
  {
    name: "delete:team",
    description: "User can access delete team",
  },
  {
    name: "read:category",
    description: "User can access category",
  },
  {
    name: "write:category",
    description: "User can access update and edit category",
  },
  {
    name: "create:category",
    description: "User can access create category",
  },
  {
    name: "delete:category",
    description: "User can access delete category",
  },
];

exports.seed = async (knex) =>
  await knex("permissions")
    .del()
    .then(async () => await knex("permissions").insert(permissions));
