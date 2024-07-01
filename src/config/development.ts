export default {
    port: process.env.PORT || 3002,
    loggin: false,
    secrets: {
        jwt: process.env.JWT_SECRET,
        dbURL: process.env.DB_URL_DEV
    }
}