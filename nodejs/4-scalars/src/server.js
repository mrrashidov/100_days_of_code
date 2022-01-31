const { GraphQLScalarType, Kind, graphql, buildSchema } = require("graphql");

const dateScalar = new GraphQLScalarType({
    name: "Date",
    description: "Date custom scalar type",
    serialize(value) {
        return value.getTime(); // Convert outgoing Date to integer for JSON
    },
    parseValue(value) {
        return new Date(value); // Convert incoming integer to Date
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.INT) {
            return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
        }
        return null; // Invalid hard-coded value (not an integer)
    },
});

const schema = buildSchema(`
scalar Date
  type Query {
    hello: String,
    time: Date
  }
`);

// The root of our graph gives us access to resolvers for each type and field
const resolversRoot = {
    hello: () => {
        return "Hello world!";
    },
    time: () => {
        return new Date();
    },
};

// Run a simple graphql query '{ hello }' and then print the response
graphql(
    schema,
    "{ time }",
    Object.assign({}, resolversRoot, { Date: dateScalar })
).then((response) => {
    console.log(response);
});
