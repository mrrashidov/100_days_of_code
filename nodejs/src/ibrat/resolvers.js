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

const createTodo = (args) => {
  const todo = {
    id: database.todos.length + 1,
    title: args.title,
    description: args.description,
    userId: args.userId,
  };

  database.todos.push(todo);

  return todo;
};

const updateTodo = (args) => {
  const todoIndex = database.todos.findIndex((todo) => args.id == todo.id);

  if (todoIndex < 0) {
    return `This todo doest not exists`;
  }

  database.todos[todoIndex] = {
    title: args.title,
    description: args.description,
    userId: args.userId,
  };

  return database.todos[todoIndex];
};

const deleteTodo = (args) => {
  const todoIndex = database.todos.findIndex((todo) => args.id == todo.id);

  if (todoIndex < 0) {
    return `This todo doest not exists`;
  }

  database.todos.splice(todoIndex, 1);

  return todoIndex;
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  createTodo,
  updateTodo,
  deleteTodo,
};
