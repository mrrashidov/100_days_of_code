const chat_rooms = [
  {
    name: "room1",
    description: "description1",
  },
  {
    name: "room2",
    description: "description2",
  },
  {
    name: "room3",
    description: "description3",
  },
  {
    name: "room4",
    description: "description4",
  },
  {
    name: "room5",
    description: "description5",
  },
  {
    name: "room6",
    description: "description6",
  },
];

exports.seed = (knex) =>
  knex("chat_rooms")
    .del()
    .then(() => knex("chat_rooms").insert(chat_rooms));
