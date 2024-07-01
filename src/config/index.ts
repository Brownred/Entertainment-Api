import merge from 'lodash.merge';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const stage = process.env.NODE_ENV || 'development';

let envConfig = require(`./${stage}`).default;

const defaultConfig = {
  stage,
  env: process.env.NODE_ENV,
  port: process.env.PORT || 3002,
  loggin: true,
  secrets: {
    jwt: process.env.JWT_SECRET,
    dbURL: process.env.DB_URL
  }
}

export default merge(defaultConfig, envConfig);