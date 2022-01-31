const { gql } = require("apollo-server-core");
module.exports = gql`
  enum Status {
    active
    passive
    pending
  }

  input CreatePermissionInput {
    name: String!
    description: String!
  }

  input UpdatePermissionInput {
    id: ID!
    name: String
    description: String
  }

  input CreateRoleInput {
    name: String!
    description: String!
    permissions: [ID!]!
  }

  input UpdateRoleInput {
    id: ID!
    name: String
    description: String
    permissions: [ID!]
  }
  input UpdateUserInput {
    id: ID!
    username: String
    email: String
    phone: String
    first_name: String
    last_name: String
    avatar: String
    status: Status
  }

  type UserName {
    first: String
    last: String
    name: String
  }
  type User {
    id: ID
    email: String
    phone: String
    avatar: String
    name: UserName
    status: Status
  }
  type Role {
    id: ID
    name: String
    description: String
    status: Status
  }

  type Permission {
    id: ID
    name: String
    description: String
  }

  type Query {
    user(id: ID!): User
    users: [User]
    role(id: ID!): Role
    roles: [Role]
    permission(id: ID!): Permission
    permissions: [Permission]
  }

  type Mutation {
    createRole(input: CreateRoleInput!): Boolean
    updateRole(input: UpdateRoleInput!): Boolean
    deleteRole(id: ID!): Boolean
    updateUser(input: UpdateUserInput!): Boolean
    deleteUser(id: ID!): Boolean
    createPermission(input: CreatePermissionInput!): Boolean
    updatePermission(input: UpdatePermissionInput!): Boolean
    deletePermission(id: ID!): Boolean
  }
`;
