const { ForbiddenError, AuthenticationError } = require('apollo-server-core')
const { verify } = require('jsonwebtoken')
const can =
    (permission, modal = false) =>
        (next) =>
            (root, args, context, info) => {
                context.user = JSON.parse(context.headers.user ? context.headers.user : null)
                context.permissions = JSON.parse(context.headers.permissions ? context.headers.permissions : null)

                const access = typeof permission === 'string' ? context.permissions.includes(permission) : permission.some((r) => context.permissions.includes(r))

                if (!context.user) throw new AuthenticationError(`Unauthenticated!`)

                if (context.permissions && !access) throw new ForbiddenError(`Forbidden!`)
                return modal ? access : next(root, args, context, info)
            }

function haveAccess(permissions, permission) {
    return typeof permission === 'string' ? permissions.includes(permission) : permission.some((r) => permissions.includes(r))
}


const PUBLIC_ACTIONS = [ "login", "register" ]

const actionIsPublic = ({ query }) => (
    PUBLIC_ACTIONS.some(action => query.includes(action))
)

const isIntrospectionQuery = ({ operationName }) => (
    operationName === 'IntrospectionQuery'
)

const shouldAuthenticate = body => (
    !isIntrospectionQuery(body) && !actionIsPublic(body)
)

const context = async ({ req }) => {
    if (shouldAuthenticate(req.body)) {
        return verify(req.headers.authorization, process.env.JWT_ACCESS_TOKEN_SECRET)
    }
}

const formatError = (e) => {
    return process.env.NODE_ENV === 'production'
        ? {
            message: e.message.startsWith('Database Error: ')
                ? 'Internal server error'
                : e.message.startsWith('Context creation failed: Query too large')
                    ? 'Query too large'
                    : e.message,
            locations: e.locations
        }
        : e
}

module.exports = {
    context,
    formatError,
    can,
    haveAccess
}