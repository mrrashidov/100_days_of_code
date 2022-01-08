const { graphql, buildSchema } = require("graphql");
const schema = buildSchema(`
  
  input CreateUserInput {
    name: String!
    email: String!
    password: String!
  }

  input UpdateUserInput {
    id: ID!
    name: String
    email: String
    password: String
  }

  input DeleteUserInput {
    id: ID!
  }
  
  input CreateTodoInput {
    body: String!
    status: Boolean!
    userId: ID!
  }

  input UpdateTodoInput {
    id: ID!
    body: String
    status: Boolean
  }

  input DeleteTodoInput {
    id: ID!
  }
  
  type Todo {
    id: ID!
    body: String!
    status: Boolean
    userId: ID!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
  }

  type DeletedUser {
    name: String!
  }

  type DeletedTodo {
    id: ID!
  }
  
  type Query {
    me(id: ID!): User!
    todo(id: ID!): Todo
    todos: [Todo!]
  }

  type Mutation {
    createUser(input:CreateUserInput!):User!
    updateUser(input:UpdateUserInput!):User!
    deleteUser(input:DeleteUserInput!):DeletedUser!
    createTodo(input:CreateTodoInput!):Todo!
    updateTodo(input:UpdateTodoInput!):Todo!
    deleteTodo(input:DeleteTodoInput!):DeletedTodo!
  }
`);

let data = {
  users: [
    {
      id: 1,
      name: "Ali",
      email: "ali@mail.ru",
      password: "12345",
    },
    {
      id: 2,
      name: "Zafar",
      email: "zafar@mail.ru",
      password: "12345",
    },
    {
      id: 3,
      name: "Vali",
      email: "vali@mail.ru",
      password: "12345",
    },
  ],
  todos: [
    {
      id: 1,
      body: "Read the book",
      status: true,
      userId: 2,
    },
    {
      id: 2,
      body: "Do homeworks",
      status: true,
      userId: 1,
    },
    {
      id: 3,
      body: "Have a rest",
      status: true,
      userId: 1,
    },
    {
      id: 4,
      body: "Learn English",
      status: true,
      userId: 3,
    },
    {
      id: 5,
      body: "Graphql",
      status: true,
      userId: 2,
    },
  ],
};

const resolversRoot = {
  me: ({ id }) => ({
    id: id,
    name: data.users[id].name,
    email: data.users[id].email,
  }),

  todo: ({ id }) => ({
    id: id,
    body: data.todos[id].body,
    status: data.todos[id].status,
    userId: data.todos[id].userId,
  }),

  todos: () => data.todos,

  createUser: ({ input }) => {
    const newUser = {
      id: data.users[data.users.length - 1].id + 1,
      name: input.name,
      email: input.email,
      password: input.password,
    };
    data.users.push(newUser);
    return newUser;
  },

  updateUser: ({ input }) => {
    const index = data.users.findIndex(
      (user) => user.id === parseInt(input.id)
    );
    if (!index) return "User not found";
    if (input.name) {
      data.users[index].name = input.name;
    }
    if (input.email) {
      data.users[index].email = input.email;
    }
    if (input.password) {
      data.users[index].password = input.password;
    }
    return data.users[index];
  },

  deleteUser: ({ input }) => {
    const index = data.users.findIndex(
      (user) => user.id === parseInt(input.id)
    );
    if (index < 0) return { name: "User not found" };
    const name = data.users[index].name;
    data.users.splice(index, 1);

    return {
      name,
    };
  },

  createTodo: ({ input }) => {
    const newTodo = {
      id: data.todos[data.todos.length - 1].id + 1,
      body: input.body,
      status: input.status || false,
      userId: input.userId,
    };
    data.todos.push(newTodo);
    return newTodo;
  },

  updateTodo: ({ input }) => {
    const index = data.todos.findIndex(
      (todo) => todo.id === parseInt(input.id)
    );
    if (!index) return "Todo not found";
    if (input.body) {
      data.todos[index].body = input.body;
    }
    if (input.status !== null) {
      data.todos[index].status = input.status;
    }
    return data.todos[index];
  },

  deleteTodo: ({ input }) => {
    const index = data.todos.findIndex(
      (todo) => todo.id === parseInt(input.id)
    );
    if (index < 0) return { id: "Not found" };
    const id = data.todos[index].id;
    data.todos.splice(index, 1);

    return {
      id,
    };
  },
};

// TODO

// graphql(
//   schema,
//   `
//     {
//       todo(id: 1) {
//         id
//         body
//         status
//         userId
//       }
//     }
//   `,
//   resolversRoot
// ).then((response) => console.log(response));

// TODOS

// graphql(
//   schema,
//   `
//     {
//       todos {
//         id
//         body
//         status
//         userId
//       }
//     }
//   `,
//   resolversRoot
// ).then((response) => console.log(response));

// ME

// graphql(
//   schema,
//   `
//     {
//       me(id: 1) {
//         id
//         name
//         email
//       }
//     }
//   `,
//   resolversRoot
// ).then((response) => console.log(response));

// UPDATE USER

// graphql(
//   schema,
//   `
//     mutation {
//       updateUser(
//         input: {
//           id: 2
//           name: "user2"
//           email: "user2@mail.ru"
//           password: "12345"
//         }
//       ) {
//         id
//         name
//         email
//       }
//     }
//   `,
//   resolversRoot
// ).then((response) => console.log(response));

// CREATE USER

// graphql(
//   schema,
//   `
//     mutation {
//       createUser(
//         input: { name: "user3", email: "user3@mail.ru", password: "12345" }
//       ) {
//         id
//         name
//         email
//       }
//     }
//   `,
//   resolversRoot
// ).then((response) => console.log(response));

// DELETE USER

// graphql(
//   schema,
//   `
//     mutation {
//       deleteUser(input: { id: 1 }) {
//         name
//       }
//     }
//   `,
//   resolversRoot
// ).then((response) => console.log(response));

// UPDATE TODO

// graphql(
//   schema,
//   `
//     mutation {
//       updateTodo(input: { id: 3, body: "Updated body", status: false }) {
//         id
//         body
//         status
//         userId
//       }
//     }
//   `,
//   resolversRoot
// ).then((response) => console.log(response));

// CREATE TODO

// graphql(
//   schema,
//   `
//     mutation {
//       createTodo(input: { body: "Body of todo", status: false, userId: 2 }) {
//         id
//         body
//         userId
//         status
//       }
//     }
//   `,
//   resolversRoot
// ).then((response) => console.log(response));

// DELETE TODO

graphql(
  schema,
  `
    mutation {
      deleteTodo(input: { id: 3 }) {
        id
      }
    }
  `,
  resolversRoot
).then((response) => console.log(response));
