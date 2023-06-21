require("dotenv").config();

const mongoose = require("mongoose");

const mongoURI = process.env.DB_URI;

const connectToMongo = async () => {
  await mongoose.connect(mongoURI, console.log("Connected to DB Successfully!"));
};

module.exports = connectToMongo;
