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
    userId: ID!
    name: String!
    description: String
    status: Status = "active"
  }
  input UpdateCategoryInput {
    id: ID!
    name: String
    description: String
    # status: Status
  }
  input CreateTagInput {
    name: String!
    userId: ID!
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
    type: Boolean
  }
  input CreateTodoInput {
    userId: ID!
    name: String!
    description: String!
    type: Boolean = false
    status: Status = "active"
    tagId: [ID!]
    categoryId: [ID!]
  }
  input UpdateTodoInput {
    id: ID!
    name: String
    description: String
    type: Boolean
    categoryId: [ID]
    tagId: [ID]
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
    description: String
  }

  type Tag {
    id: ID
    user: User
    name: String
    color: TagColors
    description: String
    status: Status
    createdAt: String
  }

  type Todo {
    id: ID
    user: User
    name: String
    description: String
    type: Boolean
    status: Status
    tag: [Tag]
    category: [Category]
    createdAt: String
  }

  type Query {
    category(id: ID!): Category
    categories: [Category]
    tag(id: ID!): Tag
    tags: [Tag]
    todo(id: ID!): Todo
    todos: [Todo]
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
