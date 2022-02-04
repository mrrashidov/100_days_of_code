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
    description: String!
    userId: ID!
    type: Boolean
    status: Status = "active"
  }
  input UpdateCategoryInput {
    id: ID!
    name: String
    description: String
    status: Status
    type: Boolean
  }
  input CreateTagInput {
    name: String!
    description: String!
    userId: ID!
    color: TagColors = "red"
    status: Status = "active"
    type: Boolean
  }
  input UpdateTagInput {
    id: ID!
    name: String
    description: String
    color: TagColors
    status: Status
    type: Boolean
  }
  input CreateTodoInput {
    name: String!
    user: ID!
    description: String!
    category_id: [ID!]
    tag_id: [ID!]
    type: Boolean
    status: Status = "active"
  }
  input UpdateTodoInput {
    id: ID!
    name: String
    description: String
    category_id: [ID!]
    tag_id: [ID!]
    type: Boolean
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
    type: Boolean
    status: Status
    # created_at: String
  }

  type Tag {
    id: ID
    user: User
    name: String
    description: String
    type: Boolean
    color: TagColors
    status: Status
  }

  type Todo {
    id: ID
    user: User
    name: String
    description: String
    tag: [Tag]
    category: [Category]
    type: Boolean
    status: Status
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
