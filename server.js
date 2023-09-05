const express = require("express");
const cors = require("cors");
const path = require("path");
const userRoute = require("./routes/UserRoute");

const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use("/", userRoute);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use("/uploads", express.static("uploads"));
app.use(express.static(path.join(__dirname, "./client/build")));

app.listen(process.env.port, () => {
  console.log("Listening to port 5678");
});
