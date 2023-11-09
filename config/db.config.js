const dotenv = require("dotenv");
dotenv.config();
const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
module.exports = {
  HOST: dbHost, // dirección de servidor MYSQL
  USER: dbUser,
  DB: "IOT",
};
