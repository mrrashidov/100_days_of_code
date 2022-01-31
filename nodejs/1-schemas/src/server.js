const {graphql, buildSchema} = require("graphql");
const schema = buildSchema(/*GraphQL*/`
  
  input CreateProductInput {
    name:String!
    price: Int!
  }
  
  input UpdateProductInput {
    id:ID!
    name:String
    price: Int
  }
  
  type Product {
    id: Int!
    name:String
    price:Float
  }
  
  type UserName {
    nick: String
    first:String
    last:String
  }
  type User {
    id: ID
    avatar:String
    name: UserName
  }
  
  type UserProducts {
    count: Int
    products:[Product!]
  }
  
  type UserResponse {
    id: ID
    user: User
    items:UserProducts
  }
  
  type Query {
    hello: String!
    me: UserResponse!
    product(id:Int!): Product! # Object | null
    products(page_size: Int page_number: Int): [Product!]
  }
  type Mutation {
    createProduct(input: CreateProductInput!): Product!
    updateProduct(input: UpdateProductInput!): Product!
  }
`);
