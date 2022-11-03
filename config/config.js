model.exports = {
  
    development: {
      username: "aciacian",
      password: "123456",
      database: "simplelogin",
      host: "127.0.0.1",
      dialect: "postgres"
    },
    test: {
      username: "root",
      password: null,
      database: "database_test",
      host: "127.0.0.1",
      dialect: "mysql"
    },
    production: {
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      host: process.env.HOST,
      dialect: "postgres"
    }

}
