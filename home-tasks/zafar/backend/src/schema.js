const { mergeTypeDefs, mergeResolvers } = require("@graphql-tools/merge"),
  { makeExecutableSchema } = require("@graphql-tools/schema"),
  { authTypeDefs, authResolvers } = require("./services/auth/schema"),
  { userTypeDefs, userResolvers } = require("./services/user/schema"),
  { todoTypeDefs, todoResolvers } = require("./services/todo/schema"),
  { chatTypeDefs, chatResolvers } = require("./services/chat/schema"),
  typeDefs = mergeTypeDefs([
    authTypeDefs,
    userTypeDefs,
    todoTypeDefs,
    chatTypeDefs,
  ]),
  resolvers = mergeResolvers([
    authResolvers,
    userResolvers,
    todoResolvers,
    chatResolvers,
  ]);
module.exports = makeExecutableSchema({
  typeDefs,
  resolvers,
});
