module.exports = {

  development: {
    client: 'postgresql',
    connection: 'postgres://localhost/caretakr',
    pool: {
      min: 2,
      max: 10
    }
  },
  seeds: {
      directory: './seeds/'
    }
};
