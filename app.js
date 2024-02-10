const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(cors());

const  commentRoutes  = require("./routes/commentRoutes");

app.use("/api", commentRoutes );

module.exports = app;
