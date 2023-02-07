const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();

// Route imports
const studentRoute = require("./routes/studentRoute");
const courseRoute = require("./routes/courseRoute");

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.set("Access-Control-Allow-Credentials", "true");
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    res.set("Access-Control-Allow-Methods", "OPTIONS,GET,PUT,POST,DELETE");
    next();
  });

// API routes
app.use("/api/student", studentRoute);
app.use("/api/course", courseRoute);

module.exports = app;