const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();
app.use(express.static(path.resolve(__dirname, "./build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve("./build/index.html"));
});

app.listen(process.env.API_PORT || 8090);
console.log("Production is running on port: ", process.env.API_PORT || 8090);
