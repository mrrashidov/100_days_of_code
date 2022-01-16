const {gql} = require('apollo-server')
module.exports = gql`
    input LoginInput {
        email: String
        phone: String
        password: String!
    }
    input SignupInput {
        email: String # email can be unique 
        phone: String # phone can be unique
        password: String!
        password_confirmation:String!
    }
    input PasswordRefresh {
        token:String!
        password:String!
        password_confirmation:String!
    }
    type User {

    }
    type AuthResponse {
        message: String
        token: String
        user: User
    }
    type Query {
        user(id:ID!): User
    }
    
    type Mutation {
        login(input: LoginInput!): AuthResponse!
        signup(input: SignupInput!): AuthResponse!
        verification(email:String phone:String):Boolean! #TODO Boolean responselar ozgartirlishi kk
        verify(code:Int!): Boolean! # TODO Boolean
        passwordForgot(email:String phone: String): Boolean! # TODO Boolean
        passwordRefresh(input: PasswordRefresh!):AuthResponse! # TODO Boolean
    }
`