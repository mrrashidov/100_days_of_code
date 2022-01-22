const users = [
  {
    username: "john",
    email: "john@yopmail.com",
    phone: "1234567",
    first_name: "John",
    last_name: "Doe",
    password: "$2a$06$epPGfcpYPFmN6RzlCXmnY.XXFcpvRM74RAHEXG.A6CDedQXKSe72q",
    avatar:
      "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/fb/fbf3a0e3a3de31ca53ed85e649a4a0405da0193b_full.jpg",
    status: 1,
  },
  {
    username: "jane",
    email: "jane@yopmail.com",
    phone: "1234567",
    first_name: "Jane",
    last_name: "Doe",
    password: "$2a$06$epPGfcpYPFmN6RzlCXmnY.XXFcpvRM74RAHEXG.A6CDedQXKSe72q",
    avatar:
      "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/2e/2effa45678681c6f9d9d934b9308a6f400bc4a49_full.jpg",
    status: 1,
  },
  {
    username: "joe",
    email: "joe@yopmail.com",
    phone: "1234567",
    first_name: "Joe",
    last_name: "Doe",
    password: "$2a$06$epPGfcpYPFmN6RzlCXmnY.XXFcpvRM74RAHEXG.A6CDedQXKSe72q",
    avatar:
      "https://cdn.discordapp.com/attachments/723456789/723456789/avatar.png",
    status: 1,
  },
  {
    username: "ali",
    email: "ali@yopmail.com",
    phone: "1234567",
    first_name: "Ali",
    last_name: "Valiev",
    password: "$2a$06$epPGfcpYPFmN6RzlCXmnY.XXFcpvRM74RAHEXG.A6CDedQXKSe72q",
    avatar:
      "https://cdn.discordapp.com/attachments/723456789/723456789/avatar.png",
    status: 1,
  },
  {
    username: "mohammad",
    email: "mohammed@yopmail.com",
    phone: "1234567",
    first_name: "Mohammed",
    last_name: "Valiev",
    password: "$2a$06$epPGfcpYPFmN6RzlCXmnY.XXFcpvRM74RAHEXG.A6CDedQXKSe72q",
    avatar:
      "https://cdn.discordapp.com/attachments/723456789/723456789/avatar.png",
    status: 1,
  },
  {
    username: "anna",
    email: "anna@yopmail.com",
    phone: "1234567",
    first_name: "Anna",
    last_name: "Valieva",
    password: "$2a$06$epPGfcpYPFmN6RzlCXmnY.XXFcpvRM74RAHEXG.A6CDedQXKSe72q",
    avatar:
      "https://cdn.discordapp.com/attachments/723456789/723456789/avatar.png",
    status: 1,
  },
];

exports.seed = (knex) =>
  knex("users")
    .del()
    .then(() => knex("users").insert(users));
