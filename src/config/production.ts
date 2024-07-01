export default {
    port: process.env.PORT || 3002,
    secrets: {
        jwt: process.env.JWT_SECRET,
        dbURL: process.env.DB_URL_PROD
    }
};