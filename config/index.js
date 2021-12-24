require('dotenv').config()

module.exports = {
    levelEnv: process.env.LEVEL,
    mongodbConnectionString: process.env.MONGODB_CONNECTION_STRING,
    mongodbOptions: {
        keepAlive: 1,
        connectTimeoutMS: 30000,
        autoIndex: false,
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    port: process.env.PORT,
    mailServerConfig: {
        mailUserName: process.env.MAIL_USER,
        mailPassword: process.env.MAIL_PASSWORD,
        mailFullName: process.env.MAIL_FULL_NAME,
        mailHost: process.env.MAIL_HOST,
        mailPort: parseInt(process.env.MAIL_PORT)
    },
    jwtSecret: process.env.JWT_SECRET
}