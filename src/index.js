require("dotenv").config();
const routes = require("./routes");
const express = require("express");
// const cors = require("cors");

const app = express();

// app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173/");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(express.json());
app.use(routes);

app.listen(process.env.PORT);
