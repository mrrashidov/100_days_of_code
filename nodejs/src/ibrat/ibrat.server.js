const { graphql } = require("graphql");
const schema = require("./schema");
const resolvers = require("./resolvers");
const ClientQuery = require("./client.query");

graphql(schema, ClientQuery, resolvers).then((response) => {
  console.log(response.data);
});
