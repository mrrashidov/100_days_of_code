const todo_categories = [
  {
    todo_id: 1,
    category_id: 5,
  },
  {
    todo_id: 2,
    category_id: 2,
  },
  {
    todo_id: 3,
    category_id: 5,
  },
  {
    todo_id: 4,
    category_id: 6,
  },
  {
    todo_id: 5,
    category_id: 4,
  },
  {
    todo_id: 6,
    category_id: 5,
  },
];

exports.seed = (knex) =>
  knex("todo_categories")
    .del()
    .then(() => knex("todo_categories").insert(todo_categories));
