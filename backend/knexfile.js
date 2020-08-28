module.exports = {
  development: {
    client: 'pg',
    useNullAsDefault: true,
    connection: {
      host: '127.0.0.1',
      user: 'postgres',
      password: '12345',
      database: 'hero_test',
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'example',
    },
    pool: {
      min: 2,
      max: 10,
    },
  },
}
