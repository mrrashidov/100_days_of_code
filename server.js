const { graphql, buildSchema } = require("graphql");
const schema = buildSchema(`
  type Query {
    hello: String!
  }
`);

// The root of our graph gives us access to resolvers for each type and field
const resolversRoot = {
  hello: () => ('Hello World')
};
// Run a simple graphql query '{ hello }' and then print the response
graphql(
  schema,`{ hello }`,
  resolversRoot
).then((response) => {
  console.log(response);
});
