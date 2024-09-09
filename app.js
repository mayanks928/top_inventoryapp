require("dotenv").config();
const express = require("express");
const app = express();
const path = require("node:path");
const router = require("./routes/router");
const PORT = 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use("/", router);
app.listen(PORT, () => {
  console.log("Listening at http://localhost:3000");
});
