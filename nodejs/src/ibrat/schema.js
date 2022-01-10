const { buildSchema } = require("graphql");

module.exports = buildSchema(/* GraphQL */ `
  type Query {
    todo(id: ID!): Todo
    todos(limit: Int!): [Todo!]
    getUserById(id: ID!): User
  }

  type Mutation {
    createUser(firstName: String!, lastName: String!, age: Int!): User!

    updateUser(id: ID!, firstName: String, lastName: String, age: Int): User!

    deleteUser(id: Int!): ID!

    createTodo(title: String!, description: String!): Todo!

    updateTodo(id: ID!, title: String, description: String): Todo!

    deleteTodo(id: ID!): ID!
  }

  type User {
    fullName: UserFullName!
    age: Int!
  }

  type UserFullName {
    firstName: String!
    lastName: String!
  }

  type Todo {
    id: ID!
    content: TodoContent!
    user: User
  }

  type TodoContent {
    title: String!
    description: String!
  }
`);
