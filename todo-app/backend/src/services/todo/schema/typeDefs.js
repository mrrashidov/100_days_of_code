const { gql } = require("apollo-server-core");
module.exports = gql`
  enum TagColors {
    red
    green
    blue
    yellow
    purple
    orange
    pink
    black
    white
  }

  input CreateCategoryInput {
    name: String!
    description: String
    status: Status = "active"
  }
  input UpdateCategoryInput {
    id: ID!
    name: String
    description: String
    status: Status
  }
  input CreateTagInput {
    name: String!
    color: TagColors = "red"
    description: String
    status: Status = "active"
  }
  input UpdateTagInput {
    id: ID!
    name: String
    color: TagColors
    description: String
    status: Status
  }
  input CreateTodoInput {
    name: String!
    description: String
    category_id: [ID!]
    tag_id: [ID!]
    status: Status = "active"
  }
  input UpdateTodoInput {
    id: ID!
    name: String
    description: String
    category_id: [ID!]
    tag_id: [ID!]
    status: Status
  }
  type MutationResponseMessage {
    title: String!
    body: String!
  }
  type MutationResponse {
    message: MutationResponseMessage
    id: ID!
  }
  type Category {
    id: ID
    user: User
    name: String
  }

  type Tag {
    id: ID
    user: User
    name: String
    color: TagColors
  }

  type Todo {
    id: ID
    name: String
    tag: [Tag]
    category: [Category]
  }
  type Query {
    category(id: ID!): Category
    categories(id: ID): [Category]
    tag(id: ID!): Tag
    tags(id: ID): [Tag]
    todo(id: ID!): Todo
    todos(id: ID): [Todo]
  }

  type Mutation {
    createCategory(input: CreateCategoryInput!): MutationResponse
    updateCategory(input: UpdateCategoryInput!): MutationResponse
    deleteCategory(id: ID!): MutationResponse
    createTag(input: CreateTagInput!): MutationResponse
    updateTag(input: UpdateTagInput!): MutationResponse
    deleteTag(id: ID!): MutationResponse
    createTodo(input: CreateTodoInput!): MutationResponse
    updateTodo(input: UpdateTodoInput!): MutationResponse
    deleteTodo(id: ID!): MutationResponse
  }
`;
