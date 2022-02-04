const categories = [
  {
    user_id: 2,
    name: "name1",
    description: "description1",
    status: 1,
    type: true,
  },
  {
    user_id: 2,
    name: "name2",
    description: "description2",
    status: 1,
    type: true,
  },
  {
    user_id: 3,
    name: "name3",
    description: "description3",
    status: 1,
    type: true,
  },
  {
    user_id: 4,
    name: "name4",
    description: "description4",
    status: 1,
    type: true,
  },
  {
    user_id: 2,
    name: "name5",
    description: "description5",
    status: 1,
    type: true,
  },
  {
    user_id: 5,
    name: "name6",
    description: "description6",
    status: 1,
    type: true,
  },
];

exports.seed = (knex) =>
  knex("categories")
    .del()
    .then(() => knex("categories").insert(categories));
