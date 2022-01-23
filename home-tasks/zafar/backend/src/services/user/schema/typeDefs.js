const { gql } = require("apollo-server-core");
module.exports = gql`
  enum Status {
    active
    passive
    pending
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
    users(id: ID!): [User]
    role(id: ID!): Role
    roles: [Role]
    permission(id: ID!): Permission
    permissions: [Permission]
  }

  type Mutation {
    createRole(name: String): Boolean
    updateRole(id: ID!): Boolean
    deleteRole(id: ID!): Boolean
    createPermission(name: String): Boolean
    updatePermission(id: ID!): Boolean
    deletePermission(id: ID!): Boolean
  }
`;
