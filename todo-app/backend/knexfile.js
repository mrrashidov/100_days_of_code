require("dotenv").config();
module.exports = {
  development: {
    client: "postgresql",
    connection: {
      port: process.env.DATABASE_PORT,
      host: process.env.DATABASE_HOST,
      database: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./database/migrations",
    },
    seeds: {
      directory: "./database/seeds",
    },
  },
};
/*	-- INSERT users
-- INSERT INTO users (username,email,phone,first_name,last_name,password)
-- VALUES ('zafar','zafar@gmal.com','123456','Zafar',' ',crypt('1111',gen_salt('md5')))

-- Update ishlami --
-- UPDATE users
-- SET password = crypt('aaa', gen_salt('md5'))
-- WHERE username = 'zafar'
-- RETURNING *
	-- LIST ishlami --
-- SELECT * FROM users;
	-- FIND ishlami --
-- SELECT * FROM users
-- WHERE username = 'zafar'
-- AND password = crypt('aaa',password)*/
