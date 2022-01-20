const config = require('../../../../knexfile'),
    {AuthenticationError} = require('apollo-server-core'),
    Knex = require('knex'),
    jwt = require('jsonwebtoken'),
    knex = Knex(config.development)

class User {
    async login(_, {input}, context, root) {
        const findUser = await knex.raw(`
            SELECT *
            FROM users
            WHERE email = ?
              AND password = crypt(?, password)`, [
            input.email,
            input.password,
        ]).then(({rows}) => rows[0])
        if (!findUser) throw new AuthenticationError('Invalid credentials')

        const token = jwt.sign({
            id: findUser.id
        }, "secret")
        return {
            message: "Login successfully",
            token: token,
            user: {
                id: findUser.id
            }
        }
    }

    async signup(_, {input}, context, root) {
        return knex.insert({
            username: Date.now().toString(),
            email: input.email,
            phone: '123123',
            first_name: 'John',
            last_name: 'Doe',
            password: knex.raw(`crypt(?,gen_salt('md5'))`, input.password),
        }).into('users')
    }

    async verification(_, args, context, root) {
        return null
    }

    async verify(_, args, context, root) {
        return null
    }

    async user(_, args, context, root) {
        return null
    }
}

module.exports = new User()
