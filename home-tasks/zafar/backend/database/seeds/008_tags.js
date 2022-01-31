const tags = [
  {
    user_id: 1,
    name: "name1",
    description: "description1",
  },
  {
    user_id: 2,
    name: "name2",
    description: "description2",
  },
  {
    user_id: 1,
    name: "name3",
    description: "description3",
  },
  {
    user_id: 4,
    name: "name4",
    description: "description4",
  },
  {
    user_id: 2,
    name: "name5",
    description: "description5",
  },
  {
    user_id: 5,
    name: "name6",
    description: "description6",
  },
];

exports.seed = (knex) =>
  knex("tags")
    .del()
    .then(() => knex("tags").insert(tags));
