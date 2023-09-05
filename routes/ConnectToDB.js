const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
let connectToMDB = async () => {
  try {
    await mongoose.connect(process.env.mdburl);
    console.log("connected to mdb successfully");
  } catch (err) {
    console.log("unable to connect to mdb");
    console.log(err);
  }
};

connectToMDB();

module.exports = connectToMDB;
