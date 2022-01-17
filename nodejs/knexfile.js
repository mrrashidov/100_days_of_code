module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'sampleDB',
      user:     'root',
      password: '111111'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './database/migrations'
    },
    seeds:{
      directory: './database/seeds'
    }
  },

};
