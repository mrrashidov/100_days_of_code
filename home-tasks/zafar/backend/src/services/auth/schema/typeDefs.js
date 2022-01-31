const { gql } = require("apollo-server-core");
module.exports = gql`
  input LoginInput {
    email: String
    phone: String
    password: String!
  }
  input SignupInput {
    email: String # email can be unique
    phone: String # phone can be unique
    username: String! # username can be unique
    first_name: String
    last_name: String
    password: String!
    password_confirmation: String!
  }
  input PasswordRefresh {
    token: String!
    password: String!
    password_confirmation: String!
  }
  type User {
    id: ID
  }

  enum Status {
    active
    passive
    pending
  }
  type UserName {
    first: String!
    last: String!
    username: String!
  }
  type User {
    id: ID!
    email: String
    phone: String
    avatar: String
    name: UserName!
    status: Status
    password: String!
  }

  type AuthResponse {
    message: String
    token: String
    user: User
  }

  type Mutation {
    login(input: LoginInput!): AuthResponse
    signup(input: SignupInput!): AuthResponse
    verification(email: String, phone: String): Boolean! #TODO Boolean responselar ozgartirlishi kk
    verify(code: Int!): Boolean! # TODO Boolean
    passwordForgot(email: String, phone: String): Boolean! # TODO Boolean
    passwordRefresh(input: PasswordRefresh!): AuthResponse! # TODO Boolean
  }
`;
