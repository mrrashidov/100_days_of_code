const todo_tags = [
  {
    todo_id: 1,
    tag_id: 5,
  },
  {
    todo_id: 2,
    tag_id: 2,
  },
  {
    todo_id: 3,
    tag_id: 5,
  },
  {
    todo_id: 4,
    tag_id: 6,
  },
  {
    todo_id: 5,
    tag_id: 4,
  },
  {
    todo_id: 6,
    tag_id: 5,
  },
];

exports.seed = (knex) =>
  knex("todo_tags")
    .del()
    .then(() => knex("todo_tags").insert(todo_tags));
