const { buildSchema } = require("graphql");

module.exports = buildSchema(/* GraphQL */ `
  enum Priority {
    Low
    Middle
    High
  }

  union SearchResult = User | Todo

  interface ISearchResult {
    id: ID
  }

  type Query {
    todo(id: ID!): Todo
    todos(limit: Int!): [Todo!]
    me(id: ID!): User
    search(pattern: String!): SearchResult
  }

  type Mutation {
    createUser(firstName: String!, lastName: String!, age: Int!): User!

    updateUser(id: ID!, firstName: String, lastName: String, age: Int): User!

    deleteUser(id: Int!): DeletedUser!

    createTodo(
      title: String!
      description: String!
      userId: Int!
      priority: Priority!
    ): Todo!

    updateTodo(id: ID!, title: String, description: String, userId: Int!): Todo!

    deleteTodo(id: ID!): DeletedTodo!
  }

  type User implements ISearchResult {
    id: ID!
    fullName: UserFullName!
    age: Int!
  }

  type UserFullName {
    firstName: String!
    lastName: String!
  }

  type DeletedUser {
    id: ID!
  }

  type Todo implements ISearchResult {
    id: ID!
    content: TodoContent!
    user: User
    priority: Priority
  }

  type TodoContent {
    title: String!
    description: String!
  }

  type DeletedTodo {
    id: ID!
  }
`);
