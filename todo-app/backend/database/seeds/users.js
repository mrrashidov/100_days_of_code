//https://chancejs.com/usage/node.html
const Chance = require('chance')
const {status} = require('../../src/helpers/constants')

function generateUsers(count) {
    let chance = new Chance();
    let users = []
    for (let i = 0; i < count; i++) {
        users.push({
            username: `${chance.name()}${i}`,
            email: chance.email(),
            phone: chance.phone(),
            first_name: chance.first(),
            last_name: chance.last(),
            password: '111111',
            avatar: chance.avatar(),
            status: status.active
        })

    }
    return users
}

exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('users').del()
        .then(function () {
            return knex('users').insert(generateUsers(1000));
        });
};
