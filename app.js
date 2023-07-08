const express = require("express");
const Cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
app.use(bodyParser.json());
app.use(cors());

const  commentRoutes  = require("./routes/commentRoutes");

app.use("/api", commentRoutes );

module.exports = app;
