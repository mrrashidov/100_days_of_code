const database = require("./database");

const createUser = (args) => {
  const user = {
    id: database.users.length + 1,
    firstName: args.firstName,
    lastName: args.lastName,
    age: args.age,
  };

  database.users.push(user);

  return user;
};

const updateUser = (args) => {
  const userIndex = database.users.findIndex((user) => args.id == user.id);

  if (userIndex < 0) {
    return `This user doest not exists`;
  }

  database.users[userIndex] = {
    firstName: args.firstName,
    lastName: args.lastName,
    age: args.age,
  };

  return database.users[userIndex];
};

const deleteUser = (args) => {
  const userIndex = database.users.findIndex((user) => args.id == user.id);

  if (userIndex < 0) {
    return `This user doest not exists`;
  }

  database.users.splice(userIndex, 1);

  return userIndex;
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
};
