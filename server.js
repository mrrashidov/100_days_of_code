const {graphql, buildSchema} = require("graphql");
const schema = buildSchema(`
  type Product {
    id: Int!
    name:String
  }
  type Query {
    hello: String!
    product(id:Int): Product! # Object | null
  }
`);

const resolversRoot = {
        hello: () => ('Hello World'),
        product: ({id}) => ({
            id: id,
            name: "product1",
        })
    }
;
graphql(schema, `{ product(id:1) { id name } }`, resolversRoot).then(response => console.log(response));
