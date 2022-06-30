module.exports = {
    HOST: "us-cdbr-east-06.cleardb.net",
    USER: "b64ca91787dbfd",
    PASSWORD: "6286c194",
    DB: "heroku_dc995228d474f31",
    dialect: "mysql",
    
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}

