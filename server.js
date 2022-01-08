const {graphql, buildSchema} = require("graphql");
const schema = buildSchema(`
  
  input CreateProductInput {
    name:String!
  }
  
  input UpdateProductInput {
    id:ID!
    name:String
  }
  
  type Product {
    id: Int!
    name:String
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
    products(page: Int): [Product!]
  }
  type Mutation {
    createProduct(input: CreateProductInput!): Product!
    updateProduct(input: UpdateProductInput!): Product!
  }
`);

const resolversRoot = {
  hello: () => ('Hello World'),
  me:()=> ({
    id: 1,
    user: {
      id: 1,
      name:{
        nick:'john',
        first:'John',
        last:'Doe'
      }
    },
    items:{
      count: 99,
      products:[
        {
          id:1,
          name:"olma"
        }
      ]
    }
  }),
  product: ({id}) => ({
    id: id,
    name: "product1",
  }),
  products: ({page}) => ([
    {
      id: 1,
      name: "product1",
    },
    {
      id: 2,
      name: "product2",
    }
  ]),
  createProduct: ({input}) => ({
    id: 11,
    name: input.name,
  }),
  updateProduct: ({input}) => ({
    id: input.id,
    name: input.name,
  }),
};
graphql(schema, `mutation{ updateProduct(input:{ id:1, name: "Test (updated)"}) { id name } }`, resolversRoot).then(response => console.log(response));
