require("dotenv").config();
const routes = require("./routes");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

app.use(express.json());
app.use(routes);

app.listen(process.env.PORT);
