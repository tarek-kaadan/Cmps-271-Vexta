const chalk = require('chalk');
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(chalk.green(`✅ Database connected: ${conn.connection.host}`));
  } catch (error) {
    console.log(chalk.red("❌ MongoDB connection error:", error));
  }
};

module.exports = connectDB;
