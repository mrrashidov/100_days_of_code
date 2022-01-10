const { graphql, buildSchema } = require("graphql");
const schema = buildSchema(/* GraphQL */ `
  union SearchResult = User | TODO

  enum UserStatus {
    super
    admin
    admin
    moderator
    user
  }

  enum TodoType {
    task
    holiday
    meeting
    other
  }

  # USER

  input UserNameInput {
    firstName: String!
    lastName: String
  }

  input CreateUserInput {
    avatar: String!
    name: UserNameInput!
    email: String!
    password: String!
    status: UserStatus = user
  }

  input UpdateUserNameInput {
    firstName: String
    lastName: String
  }

  input UpdateUserInput {
    id: ID!
    avatar: String
    name: UpdateUserNameInput
    email: String
    password: String
    status: UserStatus
  }

  input DeleteUserInput {
    id: ID!
    userId: ID!
  }

  # TODOS

  input CreateTodoInput {
    body: String!
    content: String
    status: Boolean
    type: TodoType = other
    userId: ID!
  }

  input UpdateTodoInput {
    id: ID!
    body: String
    content: String
    status: Boolean
    type: TodoType
  }

  input DeleteTodoInput {
    id: ID!
    userId: ID!
  }

  # TYPES
  # TODO
  type Todo {
    id: ID!
    body: String!
    content: String
    type: TodoType
    status: Boolean
    user: User!
  }

  # USER
  type UserName {
    firstName: String!
    lastName: String
  }

  type User {
    id: ID!
    avatar: String!
    name: UserName!
    email: String!
    status: UserStatus
    password: String!
  }

  type DeletedUser {
    id: ID!
    userId: ID!
  }

  type DeletedTodo {
    id: ID!
    userId: ID!
  }

  # QUERY

  type Query {
    me(id: ID!): User!
    todo(id: ID!): Todo
    todos: [Todo!]
  }

  # MUTATION

  type Mutation {
    createUser(input: CreateUserInput!): User!
    updateUser(input: UpdateUserInput!): User!
    deleteUser(input: DeleteUserInput!): DeletedUser!
    createTodo(input: CreateTodoInput!): Todo!
    updateTodo(input: UpdateTodoInput!): Todo!
    deleteTodo(input: DeleteTodoInput!): DeletedTodo!
  }
`);

let data = {
  users: [
    {
      id: 1,
      avatar: "ali",
      name: {
        firstName: "Ali",
        lastName: "Nabiyev",
      },
      email: "ali@mail.ru",
      password: "12345",
    },
    {
      id: 2,
      avatar: "zafar",
      name: {
        firstName: "Zafar",
        lastName: "Saidov",
      },
      email: "zafar@mail.ru",
      password: "12345",
    },
    {
      id: 3,
      avatar: "vali",
      name: {
        firstName: "Vali",
        lastName: "Soliyev",
      },
      email: "vali@mail.ru",
      password: "12345",
    },
  ],
  todos: [
    {
      id: 1,
      body: "Read the book",
      content: "content1",
      status: true,
      userId: 2,
    },
    {
      id: 2,
      body: "Do homeworks",
      content: "content2",
      status: true,
      userId: 1,
    },
    {
      id: 3,
      body: "Have a rest",
      content: "content3",
      status: true,
      userId: 1,
    },
    {
      id: 4,
      body: "Learn English",
      content: "content4",
      status: true,
      userId: 3,
    },
    {
      id: 5,
      body: "Graphql",
      content: "content3",
      status: true,
      userId: 2,
    },
  ],
};

const resolversRoot = {
  me: ({ id }) => {
    const user = data.users.find((user) => user.id === parseInt(id));
    return user;
  },

  todo: ({ id }) => {
    const todo = data.todos.find((todo) => todo.id === parseInt(id));
    const user = data.users.find((user) => user.id === parseInt(todo.userId));
    return {
      id: todo.id,
      body: todo.body,
      content: todo.content,
      status: todo.status,
      user: user,
    };
  },

  todos: () => {
    const result = data.todos.map((todo) => {
      const user = data.users.find((user) => user.id === parseInt(todo.userId));
      return {
        id: todo.id,
        body: todo.body,
        content: todo.content,
        status: todo.status,
        user: user,
      };
    });
    return result;
  },

  createUser: ({ input }) => {
    const newUser = {
      id: data.users.length + 1,
      avatar: input.avatar,
      name: {
        firstName: input.name.firstName,
        lastName: input.name.lastName,
      },
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
    if (input.avatar) {
      data.users[index].avatar = input.avatar;
    }
    if (input.name.firstName) {
      data.users[index].name.firstName = input.name.firstName;
    }
    if (input.name.lastName) {
      data.users[index].name.lastName = input.name.lastName;
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
    if (index < 0) return { id: -1, userId: input.userId };
    const id = data.users[index].id;
    data.users.splice(index, 1);
    return {
      id,
      userId: input.userId,
    };
  },

  createTodo: ({ input }) => {
    const newTodo = {
      id: data.todos.length + 1,
      body: input.body,
      content: input.content,
      status: input.status || true,
      userId: input.userId,
    };
    data.todos.push(newTodo);
    const user = data.users.find((user) => user.id === parseInt(input.userId));
    return {
      id: newTodo.id,
      body: newTodo.body,
      content: newTodo.content,
      status: newTodo.status,
      user: user,
    };
  },

  updateTodo: ({ input }) => {
    const index = data.todos.findIndex(
      (todo) => todo.id === parseInt(input.id)
    );
    if (!index) return "Todo not found";
    if (input.body) {
      data.todos[index].body = input.body;
    }
    if (input.content) {
      data.todos[index].content = input.content;
    }
    if (input.status !== null) {
      data.todos[index].status = input.status;
    }
    const user = data.users.find(
      (user) => user.id === parseInt(data.todos[index].userId)
    );
    return {
      id: data.todos[index].id,
      body: data.todos[index].body,
      content: data.todos[index].content,
      status: data.todos[index].status,
      user: user,
    };
  },

  deleteTodo: ({ input }) => {
    const index = data.todos.findIndex(
      (todo) => todo.id === parseInt(input.id)
    );
    const userIndex = data.users.findIndex(
      (user) => user.id === parseInt(input.userId)
    );
    if (index < 0 && userIndex < 0) return { id: index, userId: userIndex };
    if (index < 0 && userIndex > 0)
      return { id: index, userId: data.users[userIndex].id };
    if (index > 0 && userIndex < 0)
      return { id: data.todos[index].id, userId: userIndex };
    const id = data.todos[index].id;
    data.todos.splice(index, 1);
    return {
      id,
      userId: input.userId,
    };
  },
};

// ===================================================================

// TODO

// graphql(
//   schema,
//   `
//     {
//       todo(id: 1) {
//         id
//         body
//         content
//         status
//         user {
//           id
//           email
//           avatar
//           name {
//             firstName
//             lastName
//           }
//         }
//       }
//     }
//   `,
//   resolversRoot
// ).then((response) => console.log(response.data.todo));

// TODOS

graphql(
  schema,
  `
    {
      todos {
        id
        body
        content
        status
        user {
          id
          avatar
          email
          name {
            firstName
          }
        }
      }
    }
  `,
  resolversRoot
).then((response) => console.log(response.data.todos));

// ME;

// graphql(
//   schema,
//   `
//     {
//       me(id: 2) {
//         id
//         avatar
//         name {
//           firstName
//           lastName
//         }
//         email
//       }
//     }
//   `,
//   resolversRoot
// ).then((response) => console.log(response.data));

// UPDATE USER

// graphql(
//   schema,
//   `
//     mutation {
//       updateUser(
//         input: { id: 2, name: {}, email: "user2@mail.ru", password: "12345" }
//       ) {
//         id
//         avatar
//         name {
//           firstName
//           lastName
//         }
//         email
//       }
//     }
//   `,
//   resolversRoot
// ).then((response) => console.log(response.data));

// CREATE USER

// graphql(
//   schema,
//   `
//     mutation {
//       createUser(
//         input: {
//           avatar: "user"
//           name: { firstName: "User", lastName: "lastUser" }
//           email: "user3@mail.ru"
//           password: "12345"
//         }
//       ) {
//         id
//         avatar
//         name {
//           firstName
//           lastName
//         }
//         email
//       }
//     }
//   `,
//   resolversRoot
// ).then((response) => console.log(response.data));

// DELETE USER

// graphql(
//   schema,
//   `
//     mutation {
//       deleteUser(input: { id: 1, userId: 2 }) {
//         id
//         userId
//       }
//     }
//   `,
//   resolversRoot
// ).then((response) => console.log(response.data));

// UPDATE TODO

// graphql(
//   schema,
//   `
//     mutation {
//       updateTodo(input: { id: 3, body: "Updated body", status: false }) {
//         id
//         body
//         content
//         status
//         user {
//           id
//           avatar
//           email
//           name {
//             firstName
//           }
//         }
//       }
//     }
//   `,
//   resolversRoot
// ).then((response) => console.log(response.data));

// CREATE TODO

// graphql(
//   schema,
//   `
//     mutation {
//       createTodo(
//         input: {
//           body: "Body of todo"
//           content: "New_content"
//           status: false
//           userId: 2
//         }
//       ) {
//         id
//         content
//         status
//         user {
//           id
//           avatar
//           name {
//             lastName
//           }
//         }
//       }
//     }
//   `,
//   resolversRoot
// ).then((response) => console.log(response.data));

// DELETE TODO

// graphql(
//   schema,
//   `
//     mutation {
//       deleteTodo(input: { id: 4, userId: 2 }) {
//         id
//         userId
//       }
//     }
//   `,
//   resolversRoot
// ).then((response) => console.log(response));
