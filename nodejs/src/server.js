require('dotenv').config()
const express = require('express'),
    http = require('http'),
    { ApolloServer } = require('apollo-server-express'),
    {
        ApolloServerPluginDrainHttpServer,
        ApolloServerPluginLandingPageGraphQLPlayground,
        ApolloServerPluginCacheControlDisabled,
        ApolloServerPluginInlineTraceDisabled
    } = require('apollo-server-core'),
    { context, formatError } = require('./middleware'),
    schema = require('./schema')

async function startApolloServer(port) {
    const app = express()
    app.disable('x-powered-by')
    app.get('/', async (req, res) => {
        return res.status(200).json({
            errors: true,
            message: 'Cannot get'
        })
    })

    const httpServer = http.createServer(app)
    const server = new ApolloServer({
        introspection: true,
        schema,
        plugins: [
            ApolloServerPluginCacheControlDisabled(),
            ApolloServerPluginInlineTraceDisabled(),
            ApolloServerPluginLandingPageGraphQLPlayground(),
            ApolloServerPluginDrainHttpServer({ httpServer })
        ]
    })

    await server.start()
    server.applyMiddleware({ app })
    await new Promise((resolve) => httpServer.listen({ port }, resolve))
    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
}

startApolloServer(3000)