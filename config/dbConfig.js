module.exports = {
    HOST: "us-cdbr-east-06.cleardb.net",
    USER: "b7d00100cf9ba9",
    PASSWORD: "7d7bbae9",
    DB: "heroku_084ebaf32b1cf34",
    dialect: "mysql",
    
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}



//mysql://b7d00100cf9ba9:7d7bbae9@us-cdbr-east-06.cleardb.net/heroku_084ebaf32b1cf34?reconnect=true