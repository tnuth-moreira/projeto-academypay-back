require("dotenv").config();
const routes = require("./routes");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    optionsSuccessStatus: 200,
    methods: ["GET", "PUT", "POST"],
    credentials: true,
    maxAge: 86400,
  })
);

app.use(express.json());
app.use(routes);

app.listen(process.env.PORT);
