const {mergeTypeDefs, mergeResolvers} = require('@graphql-tools/merge'),
    {makeExecutableSchema} = require('@graphql-tools/schema'),
    {authTypeDefs, authResolvers} = require('./services/auth/schema'),
    {userTypeDefs, userResolvers} = require('./services/user/schema'),
    typeDefs = mergeTypeDefs([authTypeDefs,userTypeDefs]),
    resolvers = mergeResolvers([authResolvers,userResolvers])
module.exports = makeExecutableSchema(
    {
        typeDefs,
        resolvers
    }
)