const { buildSchema } = require("graphql");

module.exports = buildSchema(/* GraphQL */ `
  type Query {
    todo(id: ID!): Todo
    todos(limit: Int): [Todo!]
    me: User
  }

  type Mutation {
    createUser(firstName: String!, lastName: String!, age: Int!): User!

    updateUser(id: ID!, firstName: String, lastName: String, age: Int): User!

    deleteUser(id: Int!): User!

    createTodo(title: String!, description: String!): Todo!

    updateTodo(id: ID!, title: String, description: String): Todo!

    deleteTodo(id: ID!): Todo!
  }

  type User {
    fullName: UserFullName!
    age: Int!
  }

  input UserFullName {
    firstName: String!
    lastName: String!
  }

  type Todo {
    id: ID!
    content: TodoContent!
    user: User
  }

  input TodoContent {
    title: String!
    description: String!
  }
`);
