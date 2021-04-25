const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const services = require("./services");
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = process.env.PORT;
const multer = require("multer");

// create express app
const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
mongoose
  .connect(process.env.mongoDB, {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("ENV => " + process.env.mongoDB);
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

let upload = multer({ storage: storage });

// define a simple route
app.get("/", (req, res) => {
  res.json({
    message: "welcome to snaptrude project",
  });
});
services({ app, upload });

// listen for requests
app.listen(PORT, () => {
  console.log("Server is listening on port", PORT);
});
