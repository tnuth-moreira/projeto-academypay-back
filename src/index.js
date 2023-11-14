require("dotenv").config();
const router = require("./routes");
const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);
app.use(bodyParser.json());

app.listen(process.env.PORT);
