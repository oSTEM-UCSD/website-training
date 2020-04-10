require('dotenv').config();
const PORT = process.env.PORT || 8000;

const express = require('express');
const app = express();

const http = require("http");

const cors = require('cors');
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors());

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;

setTimeout(() => {
  http.get("/");
}, 30 * MINUTE);

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', () => { console.error('Problem connecting to database') });
db.once('open', () => { console.log("Connected to database") })

app.use((req, res, next) => {
  console.log(`${req.method} request received on ${req.originalUrl}`);
  next();
})

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: err });
  next();
})

app.use(express.static("public"));

const Routes = require('./routes');

app.use('/api', Routes.api);

app.listen(PORT, () => console.log(`Now listening on port ${PORT}...`));
