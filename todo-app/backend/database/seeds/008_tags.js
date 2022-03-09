const tags = [
  {
    user_id: 1,
    name: "name1",
    description: "description1",
    color: 2,
    status: 1,
  },
  {
    user_id: 2,
    name: "name2",
    description: "description2",
    color: 2,
    status: 1,
  },
  {
    user_id: 1,
    name: "name3",
    description: "description3",
    color: 2,
    status: 1,
  },
  {
    user_id: 4,
    name: "name4",
    description: "description4",
    color: 2,
    status: 1,
  },
  {
    user_id: 2,
    name: "name5",
    description: "description5",
    color: 2,
    status: 1,
  },
  {
    user_id: 5,
    name: "name6",
    description: "description6",
    color: 2,
    status: 1,
  },
];

exports.seed = (knex) =>
  knex("tags")
    .del()
    .then(() => knex("tags").insert(tags));
