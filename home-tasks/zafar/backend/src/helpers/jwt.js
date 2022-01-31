const
    jwt = require('jsonwebtoken'),
    { JWT_ACCESS_TOKEN_SECRET, JWT_ACCESS_TOKEN_EXPIRES_IN } = process.env;

class Jwt {
    store(payload) {
        return jwt.sign(payload, JWT_ACCESS_TOKEN_SECRET, {
            algorithm: 'HS256',
            noTimestamp: false,
            expiresIn: JWT_ACCESS_TOKEN_EXPIRES_IN,
            notBefore: '2s',
        })
    }

    verify(token) {
        return jwt.verify(token, JWT_ACCESS_TOKEN_SECRET);
    }
}

module.exports = Jwt;