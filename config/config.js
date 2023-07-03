require('dotenv').config();
const config = {
    env: process.env.NODE_ENV || 'dev',
    isProd: process.env.NODE_ENV === 'production',
    port: process.env.PORT || 3000,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbHost: process.env.DB_HOST,
    dbName: process.env.DB_NAME,
    dbPort: process.env.DB_PORT,
    db_url: process.env.DATABASE_URL,
    apiKey: process.env.API_KEY,
    jwtSecret: process.env.JWT_SECRET,
    email_send: process.env.EMAIL_SEND,
    password_send: process.env.PASSWORD_SEND
}

module.exports = { config };
