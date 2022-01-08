const {graphql, buildSchema} = require("graphql");
const schema = buildSchema(`
  
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

const data = {
    user: {
        id: 1,
        avatar: 'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/12/1264ca0c90886ff9a6ab015cfc286b08b8657874_full.jpg',
        firstName: 'John',
        lastName: 'Doe',
        nick: 'john'
    },
    products: [
        {
            id: 1,
            name: "First Product",
            price: 10.99
        },
        {
            id: 2,
            name: "Second Product",
            price: 3.99
        },
        {
            id: 3,
            name: "Third Product",
            price: 2.99
        },
        {
            id: 4,
            name: "Fourth Product",
            price: 1.99
        }
    ],
    user_products: [
        {
            user_id: 1,
            product_id: 1
        },
        {
            user_id: 1,
            product_id: 4
        }
    ]
}

const paginate = (array, page_size, page_number) => (array.slice(page_number * page_size, page_number * page_size + page_size))
const resolversRoot = {
    hello: () => ('Hello World'),
    me: () => ({
        id: data.user.id,
        user: {
            id: data.user.id,
            avatar: data.user.avatar,
            name: {
                nick: data.user.nick,
                first: data.user.firstName,
                last: data.user.lastName
            }
        },
        items: {
            count: data.user_products.length,
            products: data.user_products.map(up => data.products.find(product => product.id === up.product_id))
        }
    }),
    product: ({id}) => (data.products.find(product => product.id === parseInt(id))),
    products: ({page_size, page_number}) => (paginate(data.products, parseInt(page_size), parseInt(page_number) - 1)),
    createProduct: ({input}) => {
      const newData = {
        id: data.products.length + 1,
        name: input.name,
        price: input.price
      }
      data.products.push(newData)
      return newData
    },
    updateProduct: ({input}) => {
        const findIndex = data.products.findIndex((product => product.id === parseInt(input.id)));
        data.products[findIndex].name = input.name
        return data.products.find(product => product.id === parseInt(input.id))

    },
};
//graphql(schema, `{ hello }`, resolversRoot).then(response => console.log(response));
//graphql(schema, `{ product(id:1) { id name } }`, resolversRoot).then(response => console.log(response));
//graphql(schema, `{ products(page_size:11 page_number:1) { id name } }`, resolversRoot).then(response => console.log(response.data));
graphql(schema, `{ me { id user { id name { nick first last } avatar } items { count products { id name price } } } }`, resolversRoot).then(response => console.log(response));
//graphql(schema, `mutation{ createProduct(input:{ name: "Test", price: 21}) { id name price } }`, resolversRoot).then(response => console.log(response));
//graphql(schema, `mutation{ updateProduct(input:{ id:1, name: "Test (updated)"}) { id name } }`, resolversRoot).then(response => console.log(response));
