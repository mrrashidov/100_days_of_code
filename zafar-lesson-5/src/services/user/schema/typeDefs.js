const { gql } = require("apollo-server");
module.exports = gql`
  input NewUser {
    email: String
    phone: String
    password: String!
    username: String!
    full_name: UserFullNameInput!
    password: String!
    avatar: String
  }

  input UserFullNameInput {
    first_name: String!
    last_name: String!
  }

  input LoginInput {
    email: String
    phone: String
    password: String!
  }

  input SignupInput {
    email: String # email can be unique
    phone: String # phone can be unique
    password: String!
    password_confirmation: String!
  }
  input PasswordRefresh {
    token: String!
    password: String!
    password_confirmation: String!
  }

  type UserFullName {
    first_name: String!
    last_name: String!
  }

  type User {
    email: String
    phone: String
    password: String!
    username: String!
    full_name: UserFullName!
    password: String!
    avatar: String
  }

  type AuthResponse {
    message: String
    token: String
    user: User
  }

  type Query {
    user(id: ID!): User!
    users: [User!]
  }

  type Mutation {
    login(input: LoginInput!): AuthResponse!
    signup(input: SignupInput!): AuthResponse!
    verification(email: String, phone: String): Boolean! #TODO Boolean responselar ozgartirlishi kk
    verify(code: Int!): Boolean! # TODO Boolean
    passwordForgot(email: String, phone: String): Boolean! # TODO Boolean
    passwordRefresh(input: PasswordRefresh!): AuthResponse! # TODO Boolean
  }
`;
