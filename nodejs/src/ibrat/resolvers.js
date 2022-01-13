const database = require("./database");

const createUser = (args) => {
  const user = {
    id: database.users.length + 1,
    fullName: {
      firstName: args.firstName,
      lastName: args.lastName,
    },
    age: args.age,
  };

  database.users.push(user);

  return user;
};

const me = (args) => {
  const user = database.users.find((user) => args.id == user.id);

  if (!user) {
    return `This user doest not exists`;
  }

  return user;
};

const updateUser = (args) => {
  const userIndex = database.users.findIndex((user) => args.id == user.id);

  if (userIndex < 0) {
    return `This user doest not exists`;
  }

  database.users[userIndex] = {
    fullName: {
      firstName: args.firstName,
      lastName: args.lastName,
    },
    age: args.age,
  };

  return database.users[args.id];
};

const deleteUser = (args) => {
  const userIndex = database.users.findIndex((user) => args.id == user.id);

  if (userIndex < 0) {
    return `This user doest not exists`;
  }

  database.users.splice(userIndex, 1);

  return { id: args.id };
};

const createTodo = (args) => {
  const todo = {
    id: database.todos.length + 1,
    content: {
      title: args.title,
      description: args.description,
    },
    userId: args.userId,
    priority: args.priority,
  };

  database.todos.push(todo);

  return todo;
};

const todo = (args) => {
  const todo = database.todos.find((todo) => args.id == todo.id);
  const user = database.users.find((user) => todo.id == user.id);

  if (!todo) {
    return `This todo doest not exists`;
  }

  todo.user = user;

  return todo;
};

const todos = (args) => {
  const todos = database.todos.slice(0, args.limit).map((todo) => {
    const user = database.users.find((user) => todo.id == user.id);
    todo.user = user;
    return todo;
  });

  return todos;
};

const updateTodo = (args) => {
  const todoIndex = database.todos.findIndex((todo) => args.id == todo.id);

  if (todoIndex < 0) {
    return `This todo doest not exists`;
  }

  database.todos[todoIndex] = {
    content: { title: args.title, description: args.description },
    userId: args.userId,
  };

  return database.todos[args.id];
};

const deleteTodo = (args) => {
  const todoIndex = database.todos.findIndex((todo) => args.id == todo.id);

  if (todoIndex < 0) {
    return `This todo doest not exists`;
  }

  database.todos.splice(todoIndex, 1);

  return { id: args.id };
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  createTodo,
  updateTodo,
  deleteTodo,
  me,
  todo,
  todos,
};
