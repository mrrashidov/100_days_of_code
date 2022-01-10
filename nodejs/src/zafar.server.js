const { graphql, buildSchema } = require("graphql");
const schema = buildSchema(/* GraphQL */ `
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
    userId: ID!
  }

  input UpdateTodoInput {
    id: ID!
    body: String
    content: String
    status: Boolean
  }

  input DeleteTodoInput {
    id: ID!
    userId: ID!
  }

  # TYPES

  type Todo {
    id: ID!
    body: String!
    content: String
    status: Boolean
    user: User
  }

  type UserName {
    firstName: String!
    lastName: String
  }

  type User {
    id: ID!
    avatar: String!
    name: UserName!
    email: String!
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
