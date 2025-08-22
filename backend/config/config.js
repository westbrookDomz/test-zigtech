const { Sequelize } = require("sequelize");
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME || "test",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD || "password",
  {
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "mysql",
    port: process.env.DB_PORT || "3306",
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully.");
    
    // Sync models with database (optional)
    // await sequelize.sync({ alter: true }); // Use carefully in production
  } catch (error) {
    console.error("Unable to connect to the database:", error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = { Sequelize, sequelize, connectDB };