const {graphql, buildSchema} = require("graphql");
const schema = buildSchema(`
  type Product {
    id: Int!
    name:String
  }
  type Query {
    hello: String!
    product(id:Int!): Product! # Object | null
    products(page: Int): [Product!]
  }
`);

const resolversRoot = {
  hello: () => ('Hello World'),
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
graphql(schema, `{ products { id name } }`, resolversRoot).then(response => console.log(response.data));
