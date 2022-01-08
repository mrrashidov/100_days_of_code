const {graphql, buildSchema} = require("graphql");
const schema = buildSchema(`
  
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
  ])
    }
;
graphql(schema, `{ me { id user { id name { nick first last } } items { count products{ id name } } } }`, resolversRoot).then(response => console.log(response.data));
