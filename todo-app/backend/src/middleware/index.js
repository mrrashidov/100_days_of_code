const config = require("../../knexfile");
const Knex = require("knex");
const { AuthenticationError } = require("apollo-server-core");
const jwt = require("jsonwebtoken");
const knex = Knex(config[process.env.NODE_ENV]);

const PUBLIC_ACTIONS = ["login", "signup", "verification", "verify"];

const actionIsPublic = ({ query }) =>
  PUBLIC_ACTIONS.some((action) => query.includes(action));

const isIntrospectionQuery = ({ operationName }) =>
  operationName === "IntrospectionQuery";

const shouldAuthenticate = (body) =>
  !isIntrospectionQuery(body) && !actionIsPublic(body);

const context = async ({ req }) => {
  if (shouldAuthenticate(req.body)) {
    const headers = req.headers;
    if (!headers.authorization) throw new AuthenticationError("Unauthorized");
    if (!headers.authorization.startsWith("Bearer "))
      throw new AuthenticationError(
        "Authorization header must be Bearer $token"
      );
    const token = headers.authorization.split("Bearer ")[1];
    if (!!token.length) {
      return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        console.log("jwt error", err);
        //if (err) throw new AuthenticationError("Unauthorized");
        return {
          db: knex,
          req: req,
          user: decoded,
        };
      });
    }
  }

  return {
    db: knex,
    req: req,
  };
};

const formatError = (e) => {
  return process.env.NODE_ENV === "production"
    ? {
        message: e.message.startsWith("Database Error: ")
          ? "Internal server error"
          : e.message.startsWith("Context creation failed: Query too large")
          ? "Query too large"
          : e.message,
        locations: e.locations,
      }
    : e;
};

module.exports = {
  context,
  formatError,
};
